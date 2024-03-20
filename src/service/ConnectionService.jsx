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
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (2 * 60 * 60 * 1000));

        document.cookie = `token=${response.data.result}; Path=/; Expires=${expirationDate.toUTCString()};`
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
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (2 * 60 * 60 * 1000));

        document.cookie = `token=${response.data.result}; Path=/; Expires=${expirationDate.toUTCString()};`
        return response;
    } catch (error) {
        return error;
    }
}

