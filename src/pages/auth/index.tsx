import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { Login } from "ddc-ui-typescript";
import { FormikHelpers } from 'formik';

import { LogoDSF } from "@/components/atoms/Logo/Icon.atom";
import { generateSxStyles, theme } from '@/config/themes.config';
import { PATH } from "@/modules/constants/string";

export default function Auth() {
  const ROOT_APP_CODE = process.env.NEXT_PUBLIC_APP_CODE
  const router = useRouter();

  const [invalidMsg, setInvalidMsg] = useState('')

  const handleLogin = async (
    data: any,
    actions: FormikHelpers<any>
  ) => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        username: data.username,
        password: data.password,
        app_code: ROOT_APP_CODE,
        ip_source: "1"
      })

      if (response?.status == 200) {
        setInvalidMsg('')
        router.push(PATH.HOMEPAGE)
      } else {
        setInvalidMsg(response?.error || 'An unexpected error occurred')
      }
      actions.setSubmitting(false)
    } catch (error) {
      console.error('error_sign_in -> ', error)

      actions.setSubmitting(false)
      setInvalidMsg('An unexpected error occurred. Please try again later.')
    }
  };

  return (
    <Login
      logo={<LogoDSF />}
      FormProps={{
        title: 'Admin Content Management System',
        description: 'Please enter your credentials to manage content.',
        textUsername: 'Username',
        textPassword: 'Password',
        textLogin: 'Login',
        textRequiredUsername: 'Input Username',
        textRequiredPassword: 'Input Password',
        errorMessage: invalidMsg,
        sx: styles.loginForm,
        onLoginClick: handleLogin,
      }}
      variant="centered"
    />
  )
}

const styles = generateSxStyles({
    loginForm: {
        '.MuiFormControl-root': {
            marginBottom: '1rem !important',
        },
        '.MuiButton-outlined.MuiButton-outlinedPrimary': {
            marginTop: '1rem !important',
        },
        '.MuiCardContent-root': {
            '.MuiStack-root:nth-last-child(2)': {
                display: 'none',
            }
        },
        h5: {
            color: theme.palette.primary.main,
            fontWeight: 600
        },
    }
})