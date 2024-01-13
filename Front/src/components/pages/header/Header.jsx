import React, {useContext} from 'react';
import {NavLink, useLocation} from "react-router-dom";

import './Header.css';
import {Context} from "../../../index";
import Navbar from "react-bootstrap/Navbar";
import {ADMIN_ROUTE, LOGIN_ROUTE, PERSONAL_ROUTE, SEARCH_BAR_ROUTE} from "../../utils/Consts";

function Header() {
  const {user} = useContext(Context)
  const location = useLocation().pathname

  return (
    <header className="w-100 position-fixed">
      <Navbar className="container d-flex flex-wrap justify-content-between px-5 py-4">
        <div className="ps-0 ps-md-6">
          <NavLink to={SEARCH_BAR_ROUTE} className="header__title">
            <h5>SmartPharmacy</h5>
          </NavLink>
        </div>
        <div className="pe-0 pe-md-6">
          {user.isAuth ?
            <div className="d-flex">
              {location !== PERSONAL_ROUTE &&
                <NavLink to={PERSONAL_ROUTE} className="header__log-in-btn p-0 mx-2">
                  <h6>Кабинет</h6>
                </NavLink>
              }
              {(user.isModerator || user.isAdmin) && location !== ADMIN_ROUTE &&
                <NavLink to={ADMIN_ROUTE} className="header__log-in-btn p-0 mx-2">
                  <h6>Админ. панель</h6>
                </NavLink>
              }
              <NavLink to={window.location.href} onClick={() => user.logOut()} className="header__log-in-btn p-0 mx-2">
                <h6>Выйти</h6>
              </NavLink>
            </div>
            :
            <NavLink to={LOGIN_ROUTE} className="header__log-in-btn p-0">
              <h6>Войти</h6>
            </NavLink>
          }
        </div>
      </Navbar>
    </header>
  );
}

export default Header;
