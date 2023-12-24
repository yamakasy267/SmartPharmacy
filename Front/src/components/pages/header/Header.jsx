import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

import './Header.css';
import {Context} from "../../../index";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {ADMIN_ROUTE, ANALOGUE_SEARCH_ROUTE, LOGIN_ROUTE, SYMPTOM_SEARCH_ROUTE} from "../../utils/Consts";
import Nav from "react-bootstrap/Nav";
import {Button} from "react-bootstrap";

function Header() {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
      <header className="w-100 position-fixed">
        <Navbar className="container d-flex flex-wrap justify-content-between px-5 py-4">
          <div className="ps-0 ps-sm-6">
            <NavLink to={SYMPTOM_SEARCH_ROUTE} className="header__title">
              <h5>SmartPharmacy</h5>
            </NavLink>
          </div>
          <div className="pe-0 pe-sm-6">
            {user.isAuth ?
                <div className="d-flex">
                  <Nav className="p-0" onClick={() => navigate(ADMIN_ROUTE)}>
                    <a type="button" className="header__log-in-btn pe-4" onClick={() => navigate(LOGIN_ROUTE)}>
                      <h6>Админ панель</h6>
                    </a>
                  </Nav>
                  <Nav className="p-0" onClick={() => logOut()}>
                    <a type="button" className="header__log-in-btn" onClick={() => navigate(LOGIN_ROUTE)}>
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
