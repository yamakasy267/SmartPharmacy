import React, {createContext} from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import UserStore from "./components/store/UserStore";
import ProductStore from "./components/store/ProductStore";
import FavoriteProductStorage from "./components/store/FavoriteProductStorage";
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css';


export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    ProductStore: new ProductStore(),
    FavoriteProducts: new FavoriteProductStorage()
  }}>
    <App/>
  </Context.Provider>
);

reportWebVitals();