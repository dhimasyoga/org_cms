import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import AuthService from "@/modules/services/auth/https";

const ROOT_API_ORGANIZATION = process.env.NEXT_PUBLIC_API_ORG;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        app_code: { label: "App_Code", type: "text" },
        ip_source: {label: "IP", type: "text"},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const formData = new URLSearchParams({
            username: credentials?.username,
            password: credentials?.password,
            app_code: credentials?.app_code,
            ip_source: credentials?.ip_source
          })
          const response = await AuthService.SignIn(formData)

          if (response.data.status && response.data.token) {
            const urlUser = `${ROOT_API_ORGANIZATION}/user/me`;
            const user = await axios
              .get(urlUser, {
                headers: {
                  Authorization: `Bearer ${response.data.token}`,
                },
                validateStatus: () => true,
              })
              .catch((err) => err.response);

            if (user?.data.status) {
              response.data.user = {
                id: user.data.data.id,
                fullname: user.data.data.fullname,
                username: user.data.data.username,
                email: user.data.data.email,
              }
              response.data.fullname = user.data.data.fullname;
              return response.data;
            }

            return response.data
          } else {
            throw new Error(response.data.message || 'Login failed');
          }
        } catch (err: any) {
          console.error('[NEXTAUTH] error during authorize:', err)
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.refreshToken = user.refresh_token;
        token.expire = user.expire;
        token.user = user.user
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expire = token.expire;
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
  },
  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    maxAge: 12 * 60 * 60,
  },
  pages: {
    signIn: "/auth",
  },
  debug: true
};

export default NextAuth(authOptions);
