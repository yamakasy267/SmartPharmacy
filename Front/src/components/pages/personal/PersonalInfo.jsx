import React, {useContext} from "react";
import {Context} from "../../../index";
import {UPDATE_USER_INFO_ROUTE} from "../../utils/Consts";
import {useNavigate} from "react-router-dom";

import './Personal.css';

const PersonalInfo = () => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  return (
    <div className="personal__info d-flex flex-column p-4">
      <button className="personal__info_change d-flex justify-content-end align-items-center p-0 pb-2" type="button"
              onClick={e => navigate(UPDATE_USER_INFO_ROUTE)}>
        <h5 className="fw-bolder">Изменить&ensp;</h5>
        <i className="bi bi-pencil-fill personal__info_change-btn-icon"></i>
      </button>

      <div className="personal__info_name pt-4 pb-2">
        <h4>{user.name_}</h4>
      </div>
      <div className="personal__info_name pb-4">
        <h6>{user.email_}</h6>
      </div>
      <div className="personal__info_birthdate d-flex justify-content-between align-items-end pb-2">
        <h6>Дата рождения</h6>
        <h6>{user.birthdate_}</h6>
      </div>
    </div>
  );
}

export default PersonalInfo;
