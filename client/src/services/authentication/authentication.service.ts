import axios from '../../axios.config';

export interface LoginInterfaceI {
    data: {
        user: {
            uuid: string;
            email: string;
        },
        access_token: string;
        refresh_token: string;
    }
}

const AuthenticationService = {

    login: (email: string, password: string): Promise<LoginInterfaceI> => {
        return axios.post('auth/login', {email, password})
    },

    verifyToken: (auth_token: string, refresh_token: string) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer ${auth_token}`
            }
        }
        return axios.post('auth/token', {
            refresh_token
        }, config);
    }

};

export default AuthenticationService;