import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

import {LOGIN_ROUTE, PERSONAL_ROUTE, REGISTRATION_ROUTE} from "../../utils/Consts";
import {fetchUserInfo, login, registration} from "../../api/UserAPI";
import {Context} from "../../../index";

import "./Auth.css";
import arrow_right from "../../../assets/arrow-right.svg";
import {fetchFavorites} from "../../api/ProductAPI";
import Loading from "../../LoadingModule";

const AuthPage = observer(() => {
  const {user} = useContext(Context);
  const {favoriteProducts} = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [loading, setLoading] = useState(false);

  // }).catch(function (error) {
//   if (error.response) {
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//   } else if (error.request) {
//     console.log(error.request);
//   } else {
//     console.log('Error', error.message);
//   }
//   console.log(error.config);
// });

  function errCatch(error) {
    if (error.response) {
      let errText = "";
      for (let key of Object.keys(error.response.data)) {
        errText += key + " -> " + error.response.data[key] + '\n';
      }
      alert(errText)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message);
    }
  }

  const Auth = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      await registration(name, email, password, birthdate).catch(error => errCatch(error));
    }

    try {
      await login(email, password).catch(error => errCatch(error));
      let userData = await fetchUserInfo();
      user.setUser(userData["user"]);
      user.setAuth(true);
      setLoading(true);

      fetchFavorites().then(data => {
        favoriteProducts.setProducts(data["views"]);
        setLoading(false);
      })

      if (isLogin) {
        navigate(-1);
      } else {
        navigate(PERSONAL_ROUTE);
      }
    } catch {
    }
  }

  // const Auth = async (e) => {
  //   e.preventDefault();
  //   if (!isLogin) {
  //     try {
  //       await registration(name, email, password, birthdate)
  //     } catch (e) {
  //       switch ("") {
  //         case name:
  //           alert("Заполните поле \"Имя\"!");
  //           return;
  //         case email:
  //           alert("Заполните поле \"Почта\"!");
  //           return;
  //         case password:
  //           alert("Заполните поле \"Пароль\"!");
  //           return;
  //         case birthdate:
  //           alert("Заполните поле \"Дата рождения\"!");
  //           return;
  //       }
  //       alert("Проверьте вводимые данные!");
  //       return;
  //     }
  //   }
  //
  //   try {
  //     await login(email, password);
  //     let userData = await fetchUserInfo();
  //     user.setUser(userData["user"]);
  //     user.setAuth(true);
  //
  //     setLoading(true);
  //
  //     if (user.isAdmin) {
  //       await fetchAllUsersInfo().then((data) => {
  //         for (let i = 0; i < data.count; i++) {
  //           userStorage.push(data.user[i])
  //         }
  //       });
  //     }
  //
  //     if (user.isModerator) {
  //       await fetchCategories().then((data) => {
  //         for (let i = 0; i < data.category.length; i++) {
  //           categoryStorage.push(data.category[i])
  //         }
  //       });
  //     }
  //
  //     fetchFavorites().then(data => {
  //       favoriteProducts.setProducts(data["views"]);
  //       setLoading(false);
  //     })
  //
  //     // await fetchFavorites().then(data => {
  //     //   data["views"].forEach((product) => {
  //     //       favoriteProducts.products.set(product.pk, {
  //     //         name: product.name,
  //     //         category: product.category__name,
  //     //         elements: product.element,
  //     //         img_url: product.image,
  //     //         producer: product.producer,
  //     //         quantity: product.quantity,
  //     //         release_form: product.release_form,
  //     //         cost: product.total_amount
  //     //       });
  //     //     }
  //     //   );
  //     // })
  //
  //     if (isLogin) {
  //       navigate(-1);
  //     } else {
  //       navigate(PERSONAL_ROUTE);
  //     }
  //   } catch (e) {
  //     alert("Неверный логин или пароль!");
  //   }
  // }

  if (loading) {
    return <Loading/>
  }

  return (
    <Container className="d-flex flex-fill justify-content-center align-items-center">
      <div className='modal__body w-100 p-4'>

        <Form className="d-flex flex-column" onSubmit={Auth}>
          <h4
            className="text-center text-sm-start py-0 py-sm-1 px-0 px-sm-4 fw-bold">{isLogin ? 'Вход' : "Регистрация"}</h4>
          {isLogin ?
            <div className="d-flex flex-column py-4 py-sm-3 px-0 px-sm-4">
              <h6 className="ps-1 pb-1">Почта:</h6>
              <Form.Control type="email" className="modal__input p-2" placeholder="name@example.com"
                            value={email} onChange={e => setEmail(e.target.value)}
              />
              <h6 className="ps-1 pt-3 pt-sm-4 pb-1">Пароль:</h6>
              <Form.Control type="password" className="modal__input p-2"
                            value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>
            :
            <div className="d-flex flex-column py-4 py-sm-3 px-0 px-sm-4">
              <h6 className="ps-1 pb-1">Имя:</h6>
              <Form.Control className="modal__input p-2" placeholder="Иванов Иван"
                            value={name} onChange={e => setName(e.target.value)}
              />
              <h6 className="ps-1 pt-3 pt-sm-4 pb-1">Почта:</h6>
              <Form.Control type="email" className="modal__input p-2" placeholder="name@example.com"
                            value={email} onChange={e => setEmail(e.target.value)}
              />
              <h6 className="ps-1 pt-3 pt-sm-4 pb-1">Пароль:</h6>
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
            <button type="submit" className="p-0">
              <img src={arrow_right} alt="Вперёд"/>
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
});

export default AuthPage;
