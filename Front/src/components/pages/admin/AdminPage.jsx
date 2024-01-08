import React, {useEffect, useRef} from "react";
import "./AdminPage.css";
import {REPORT_ROUTE} from "../../utils/Consts";
import {Link} from "react-router-dom";

const AdminPage = () => {

  return (
    <div className="container d-flex flex-column">
      <div>1. тут у нас будут выводиться пользователи и будет поиск по ним можно будет удалять и
        редактировать личную инфу пользователей
      </div>
      <div>2. конфигурирование цепочек симптомы - лекарства</div>

      <div>3. добавить возможность удалять комментарии</div>
      <div>4. удаление favorite</div>
      <div>5. починить пагинацию</div>
      <div>6. починить пагинацию</div>

      <Link to={REPORT_ROUTE}>Создать отчет</Link>
    </div>
  );
}

export default AdminPage;