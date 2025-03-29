import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation, useNavigate } from "react-router";
import AuthenticationService from "../services/authentication/authentication.service";

const ProtectedRoute = ({children}: any) => {
    const [token, setCookie, removeCookie] = useCookies(['auth_token']);
    const [refreshToken, setRefreshToken, removerefreshToken] = useCookies(['refresh_token']);
    const navigate = useNavigate();
    const location = useLocation();

    //TODO: put loading spinner
    const [isLoading, setLoading] = useState(true);
    const [requestDone, setReqDone] = useState(false);

    const checkAuthToken = async (token: string, refreshToken: string) => {
        try {
            const verify = await AuthenticationService.verifyToken(token, refreshToken);
            navigate(''); 
        }
        catch(e) {
            removeCookie('auth_token');
            removerefreshToken('refresh_token');
            navigate('/login');
        }
        setLoading(false);  
        setReqDone(true);
    };

    useEffect(() => {
        const isNotAuthPage = location.pathname !== "/login" && location.pathname !== "/signup";
        if(Object.keys(token).length === 0 && isNotAuthPage){
            navigate('/login');
            return;
        }
        else if(isNotAuthPage && !requestDone) {
            checkAuthToken(token.auth_token, refreshToken.refresh_token);
        }
    });

    return (
        <React.Fragment>
          {children}
        </React.Fragment>
      );
}

export default ProtectedRoute;