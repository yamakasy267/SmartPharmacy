import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

import {PERSONAL_ROUTE} from "../../utils/Consts";
import {fetchUserInfo, updateUserInfo} from "../../api/UserAPI";
import {Context} from "../../../index";

import "./Auth.css";
import arrow_right from "../../../assets/arrow-right.svg";

const UpdateUserInfoPage = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()
  const [name, setName] = useState(user.name_)
  const [password, setPassword] = useState("")
  const [verificationPassword, setVerificationPassword] = useState("")

  const UpdateUserInfo = async (e) => {
    e.preventDefault();

    switch ('') {
      case name: alert("Заполните поле \"Имя\"!"); return;
      case password: alert("Заполните поле \"Пароль\"!"); return;
      case verificationPassword: alert("Заполните поле \"Email\"!"); return;
    }

    if(password !== verificationPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    if(password === '') {
      alert("Пароль не может быть пустой строкой!");
      return;
    }

    try {
      await updateUserInfo(name, password, user.birthdate_);

      let userData = await fetchUserInfo();
      user.setUser(userData["user"])
    } catch {
      alert("Проверьте вводимые данные!");
      return;
    }
    navigate(PERSONAL_ROUTE);
  }

  return (
    <Container className="d-flex flex-fill justify-content-center align-items-center">
      <div className='modal__body w-100 p-4'>
        <Form className="d-flex flex-column" onSubmit={UpdateUserInfo}>
          <h4 className="text-center text-sm-start py-0 py-sm-1 px-0 px-sm-4 fw-bold">
            Изменение личных данных
          </h4>
          <div className="d-flex flex-column py-4 py-sm-3 px-0 px-sm-4">
            <h6 className="ps-1 pb-1">Новое имя:</h6>
            <Form.Control className="modal__input p-2"
                          value={name} onChange={e => setName(e.target.value)}
            />
            <h6 className="ps-1 pt-3 pt-sm-4 pb-1">Новый пароль:</h6>
            <Form.Control type="password" className="modal__input p-2"
                          value={password} onChange={e => setPassword(e.target.value)}
            />
            <h6 className="ps-1 pt-3 pt-sm-4 pb-1">Проверка пароля:</h6>
            <Form.Control type="password" className="modal__input p-2"
                          value={verificationPassword} onChange={e => setVerificationPassword(e.target.value)}
            />
          </div>
          <div className="d-flex flex-wrap text-center justify-content-between p-0 p-sm-3">
            <div className="pb-2 pb-sm-0">
              <NavLink className="modal__log-in" type="button" to={PERSONAL_ROUTE}>
                <h6>Вернуться в кабинет</h6>
              </NavLink>
            </div>
            <button type="submit" className="p-0">
              <img src={arrow_right} alt="Вперёд"/>
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
});

export default UpdateUserInfoPage;
