import React, {createContext} from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import User from "./components/store/User";
import ProductStorage from "./components/store/ProductStorage";
import FavoriteProductStorage from "./components/store/FavoriteProductStorage";
import ChainStorage from "./components/store/ChainStorage";
import CategoryStorage from "./components/store/CategoryStorage";
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css';
import {scrap} from "./components/api/ProductAPI";

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));

scrap()
console.log("бегите")

root.render(
  <Context.Provider value={{
    user: new User(),
    productStorage: new ProductStorage(),
    favoriteProducts: new FavoriteProductStorage(),
    chainStorage: new ChainStorage(),
    categoryStorage: new CategoryStorage(),
    userStorage: []
  }}>
    <App/>
  </Context.Provider>
);

reportWebVitals();