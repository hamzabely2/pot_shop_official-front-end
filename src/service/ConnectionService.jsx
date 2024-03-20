import axios from "axios";
const userString = "User";
export const RegisterService = async(payload)  => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_URL}${userString}/login`,
            {
                email: payload.email,
                password: payload.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        document.cookie = `auth_token=${response.data.token}; Path=/; Expires=${new Date(response.data.expiresIn)};`;
        return response;
    } catch (error) {
        return error;
    }
}

export const LoginService = async(payload)  => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_URL}${userString}/login`,
            {
                email: payload.email,
                password: payload.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        document.cookie = `auth_token=${response.data.token}; Path=/; Expires=${new Date(response.data.expiresIn)};`;
        return response;
    } catch (error) {
        return error;
    }
}

