// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expire?: number;
    user?: any;
  }

  interface User {
    token?: string;
    user?: any;
    refresh_token?: string;
    expire?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expire?: number;
    user?: any;
  }
}
