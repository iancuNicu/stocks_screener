import { Route } from "react-router-dom";
import { Overview } from "../pages/overview/overview";
import { Queries } from "../pages/queries/queries";
import { OverviewSymbol } from "../pages/symbol-overview/symbol-overview";
import { RouteI } from "./routes.config";

const routes: RouteI[] = [
    {
        path: '',
        element: < Overview/>,
        exact: true,
        key: 'overview'
    },
    {
        path: '/overview/:symbol',
        element: <OverviewSymbol/>,
        exact: true,
        key: 'overview-symbol'
    },
    {
        path: '/queries',
        element: <Queries />,
        exact: true,
        key: 'queries'
    }
];


const mappedRoutes = routes.map((route: RouteI) => <Route {...route} />);

export default mappedRoutes;