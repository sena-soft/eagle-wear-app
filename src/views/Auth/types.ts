

export interface LoginFormProps {
    username: string;
    password: string;
}
export interface User {
    user: string;
    token: string | null;
    idUser: number;
}
export interface DecodedToken {
    sub: number;
    user: string;
    exp: number;
}