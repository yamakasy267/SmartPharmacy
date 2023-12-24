import './Personal.css';

function PersonalInfo() {
  return (
    <div className="personal__info d-flex flex-column p-4">
      <div className="personal__info_change d-flex justify-content-end pb-2 align-items-center">
        <h5 className="fw-bolder">Изменить&ensp;</h5>
        <i className="bi bi-pencil-fill personal__info_change-btn-icon"></i>
      </div>
      <div className="personal__info_delete d-flex justify-content-end pb-2 align-items-center">
        <h5 className="fw-bolder">Удалить&ensp;</h5>
        <i className="bi bi-trash-fill personal__info_change-btn-icon"></i>
      </div>
      <div className="personal__info_name pt-4 pb-4">
        <h4>Вы клоун</h4>
      </div>
      <div className="personal__info_birthdate d-flex justify-content-between align-items-end pb-2">
        <h6>Дата рождения</h6>
        <h6>21.10.2000</h6>
      </div>
    </div>
  );
}

export default PersonalInfo;
