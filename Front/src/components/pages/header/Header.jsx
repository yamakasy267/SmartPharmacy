import React, {useContext} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import './Header.css';
import {Context} from "../../../index";
import Navbar from "react-bootstrap/Navbar";
import {ADMIN_ROUTE, LOGIN_ROUTE, PERSONAL_ROUTE, SEARCH_BAR_ROUTE, SYMPTOM_SEARCH_ROUTE} from "../../utils/Consts";
import Nav from "react-bootstrap/Nav";

function Header() {
  const {user} = useContext(Context)
  const navigate = useNavigate()
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
              { location !== PERSONAL_ROUTE &&
                <Nav className="p-0 mx-2" onClick={() => navigate(PERSONAL_ROUTE)}>
                  <a type="button" className="header__log-in-btn">
                    <h6>Кабинет</h6>
                  </a>
                </Nav>
              }
              { user.isAdmin && location !== ADMIN_ROUTE &&
                <Nav className="p-0 mx-2" onClick={() => navigate(ADMIN_ROUTE)}>
                  <a type="button" className="header__log-in-btn">
                    <h6>Админ панель</h6>
                  </a>
                </Nav>
              }
              <Nav className="p-0 mx-2" onClick={() => user.logOut()}>
                <a type="button" className="header__log-in-btn" onClick={() => navigate(0)}>
                  <h6>Выйти</h6>
                </a>
              </Nav>
            </div>
            :
            <Nav className="p-0">
              <a type="button" className="header__log-in-btn" onClick={() => navigate(LOGIN_ROUTE)}>
                <h6>Войти</h6>
              </a>
            </Nav>
          }
        </div>
      </Navbar>
    </header>
  );
}

export default Header;
