import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SYMPTOM_SEARCH_ROUTE} from "../utils/Consts";
import {login, registration} from "../http/UserAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

import "./Modal.css";
import arrow_right from "../../assets/arrow-right.svg";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [birthdate, setBirthdate] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(name, email, password, birthdate);
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SYMPTOM_SEARCH_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container className="d-flex flex-fill justify-content-center align-items-center">
            <div className='modal__body w-100 p-4'>

                <Form className="d-flex flex-column">
                    <h4 className="text-center text-sm-start p-0 pt-0 pt-sm-1 px-0 px-sm-4 fw-bold">{isLogin ? 'Вход' : "Регистрация"}</h4>
                    {isLogin ?
                        <div className="d-flex flex-column py-3 py-sm-4 p-0 p-sm-4">
                            <h6 className="ps-1 pb-1">Email:</h6>
                            <Form.Control type="email" className="modal__input p-2" placeholder="name@example.com"
                                          value={email} onChange={e => setEmail(e.target.value)}
                            />
                            <h6 className="ps-1 pt-3 pt-sm-4 pb-1">Password:</h6>
                            <Form.Control type="password" className="modal__input p-2"
                                          value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        :
                        <div className="d-flex flex-column py-3 py-sm-4 p-0 p-sm-4">
                            <h6 className="ps-1 pb-1">Name:</h6>
                            <Form.Control className="modal__input p-2" placeholder="Иванов Иван"
                                          value={name} onChange={e => setName(e.target.value)}
                            />
                            <h6 className="ps-1 pt-3 pt-sm-4 pb-1">Email:</h6>
                            <Form.Control type="email" className="modal__input p-2" placeholder="name@example.com"
                                          value={email} onChange={e => setEmail(e.target.value)}
                            />
                            <h6 className="ps-1 pt-3 pt-sm-4 pb-1">Password:</h6>
                            <Form.Control type="password" className="modal__input p-2"
                                          value={password} onChange={e => setPassword(e.target.value)}
                            />
                            <h6 className="ps-1 pt-3 pt-sm-4 pb-1">Дата рождения:</h6>
                            <Form.Control type="date" className="modal__input p-2"
                                          value={birthdate} onChange={e => setBirthdate(e.target.value)}
                            />
                        </div>
                    }
                    <div className="d-flex flex-wrap text-center justify-content-between p-0 p-sm-3">
                        {isLogin ?
                            <div className="pb-2 pb-sm-0">
                                <NavLink className="modal__log-in" type="button" to={REGISTRATION_ROUTE}>
                                    <h6>Зарегистрироваться</h6>
                                </NavLink>
                            </div>
                            :
                            <div className="pb-2 pb-sm-0">
                                <NavLink className="modal__log-in" type="button" to={LOGIN_ROUTE}>
                                    <h6>Войти</h6>
                                </NavLink>
                            </div>
                        }
                        <button type="button" onClick={click} className="p-0">
                            <img src={arrow_right} alt="Вперёд"/>
                        </button>
                    </div>
                </Form>
            </div>


        </Container>
    );
});

export default Auth;
