import { Login, Button } from "ddc-ui-typescript";
import WindowIcon from '@mui/icons-material/Window';
import { LogoDSF } from "@/components/atoms/Logo/Icon.atom";
import { generateSxStyles, theme } from '@/config/themes.config';

const AzureLoginButton = (
    <Button
        text="Login with microsoft azure"
        endIcon={<WindowIcon />}
        variant="outlined"
        size="large"
    />
)

export default function Auth() {
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
                additionalActions: AzureLoginButton,
                sx: styles.loginForm
                // errorMessage: 'Invalid Username or Password!',
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
        '.MuiBox-root.css-0:nth-child(2)': {
            '+ .MuiStack-root': {
                display: 'none',
            }
        },
        h5: {
            color: theme.palette.primary.main,
            fontWeight: 600
        },
    }
})