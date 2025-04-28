import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_ORG

async function SignIn(data: any) {
    const response = await axios.post(`${baseUrl}/user/token`, data, {
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        },
    })

    return response;
}

async function SignOut() {
    const response = await axios.post(`${baseUrl}/user/logout`)
    return response;
}

const AuthService = {
    SignIn,
    SignOut,
}

export default AuthService;