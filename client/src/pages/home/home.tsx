import { Routes } from "react-router-dom";
import { Navigation } from "../../components/navbar/navbar";

import './home.scss';

import routes from '../../navigation/home.routes.config';

const Home = () => {
    return (
        <>
          <Navigation></Navigation>
          <div className="home-container">
            <Routes>
              {routes}
            </Routes>
          </div>
        </>
    )
}

export default Home;