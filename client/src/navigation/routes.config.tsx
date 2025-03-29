import { Route }  from 'react-router-dom';

import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import Home from "../pages/home/home";
import ProtectedRoute from '../hoc/protected-route';

export interface RouteI {
    path: string;
    element: any;
    exact: boolean;
    key?: string;
}

const routes: RouteI[] = [
    {
        path: '/login',
        element: <LoginPage />,
        exact: true,
        key: 'a'
    },
    {
        path: '/signup',
        element: <SignupPage />,
        exact: true,
        key: 'b'
    },
    {
        path: '/*',
        element:
        <ProtectedRoute>
            <Home />
        </ProtectedRoute>,
        exact: true,
        key: 'c'
    }
];

const mappedRoutes = routes.map((route: RouteI) => <Route {...route} />);

export default mappedRoutes;