import { Routes } from "react-router-dom";
import routes from './navigation/routes.config';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = (props:any) => {

  return (
      <div className='app'>
        <Provider store={store}>
          <Routes>
            {routes}
          </Routes>
        </Provider>
      </div>
  );
  
}

export default App;
