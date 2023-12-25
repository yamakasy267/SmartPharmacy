import React from "react";

function Symptom(props) {
  return (
    <div className="items-section__search-item d-inline-flex p-2 me-1 mb-1">
      <h6 className="pe-1">{props.title}</h6>
      <button id="" type="button" className="cancel-btn d-flex align-items-center px-0">
        <i className="items-section__search-item_close-btn bi bi-x-lg"></i>
      </button>
    </div>
  );
}

export default Symptom;
