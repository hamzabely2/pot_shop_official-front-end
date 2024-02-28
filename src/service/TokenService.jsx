import Cookies from 'universal-cookie';
import {useEffect} from 'react';
const cookies = new Cookies();


//id: tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn"],
//role: tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
//username: tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
//email: tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],


export function decodeToken(token) {
    try {
        if(token === null)
            return null;

        return JSON.parse(atob(token.split('.')[1]));

    } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
        return null;
    }
}

export function getRoleFromToken(token) {
    const tokenData = decodeToken(token);

    if (tokenData && tokenData.hasOwnProperty("http://schemas.microsoft.com/ws/2008/06/identity/claims/role")) {
        return tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    return null;
}

export function getNameFromToken() {
    const token = cookies.get("token");
    const tokenData = decodeToken(token);
    if (tokenData && tokenData.hasOwnProperty("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")) {
        return tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    }
    return null;
}

export const setCookie = (name, token) => {
    const date = new Date();
    date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
    cookies.set(name, token, { expires: date, path: '/', secure: true, sameSite: 'strict' });
};

