import React, {useContext} from "react";
import "./AdminPage.css";
import {REPORT_ROUTE} from "../../utils/Consts";
import {Link} from "react-router-dom";
import {Context} from "../../../index";
import UserTableModule from "./UserTableModule";
import {observer} from "mobx-react-lite";
import ChainTableModule from "./ChainTableModule";

const AdminPage = observer(() => {
  const {user} = useContext(Context);

  return (
    <div className="container d-flex flex-column">
      <div className="product d-flex align-items-center p-3 mb-4">
        <h5 className="fw-bold pe-4">Конфигуратор отчетов</h5>
        <Link to={REPORT_ROUTE}>
          <button type="submit" className="btn btn-secondary">Создать отчет</button>
        </Link>
      </div>

      {user.isModerator &&
        <ChainTableModule/>
      }

      {user.isAdmin &&
        <UserTableModule/>
      }
    </div>
  );
});

export default AdminPage;