import { jwtDecode } from "jwt-decode";

export const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const getToken = () : string | null => {
    return localStorage.getItem("token");
};

type Token = {
    'https://my-app.example.com/roles': string
}

export const getRol = (): string | null => {
    let token = getToken();
    let decodedToken;
    if(token) decodedToken = jwtDecode(token) as Token;
    let roles = "";
    if(decodedToken) roles = decodedToken['https://my-app.example.com/roles'];
    return roles;
};