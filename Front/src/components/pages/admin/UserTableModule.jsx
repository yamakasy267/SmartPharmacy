import React, {useContext, useEffect} from "react";
import "./AdminPage.css";

import {deleteUser, fetchAllUsersInfo} from "../../api/UserAPI";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const UserTableModule = observer(() => {
  const {user} = useContext(Context);
  let {userStorage} = useContext(Context);

  useEffect(() => {
    fetchAllUsersInfo().then((data) => {
      for (let i = 0; i < data.count; i++) {
        userStorage.push(data.user[i])
      }
    });
  }, [])

  async function removeUser(userId) {
    let deleteId = userStorage.findIndex(currUser => currUser.pk === userId);
    if (deleteId > -1) {
      let data;
      data = await deleteUser(userId);
      if (data.status === 200) {
        userStorage.splice(deleteId, 1);
        alert("Пользователь удален успешно");
      }
    }
  }

  return (
    <div className="product d-flex flex-column px-2 pb-2 mb-4">
      <h5 className="fw-bold px-2 py-3">Таблица пользователей</h5>
      <table className="table table-sm table__border text-center m-0">
        <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Пользователь</th>
          <th scope="col">Почта</th>
          <th scope="col">Дата рождения</th>
          <th scope="col">Роль</th>
          <th scope="col">Действия</th>
        </tr>
        </thead>
        <tbody>
        {userStorage.map((currUser, index) =>
          <tr key={index}>
            <th scope="row">{currUser.pk}</th>
            <td>{currUser.name}</td>
            <td>{currUser.email}</td>
            <td>{currUser.date_of_birth}</td>
            <td>{currUser.role__name}</td>
            <td>
              {(user.role !== currUser.role__name) &&
                <a type="button" className="text-center" onClick={e => removeUser(currUser.pk)}>
                  Удалить
                </a>
              }
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
});

export default UserTableModule;