
export interface AccessTokenI {
    access_token: string;
    refresh_token: string;
}

export interface AuthResponseI {
    user: any;
    access_token: string;
    refresh_token: string;
}