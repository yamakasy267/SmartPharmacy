import React from "react";
import {useNavigate} from "react-router-dom";

import Container from "react-bootstrap/Container";
import {SEARCH_BAR_ROUTE} from "../../utils/Consts";

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <Container className="d-flex flex-column flex-fill justify-content-center align-items-center p-4">
      <div className="pb-3">
        <h4>Cтраница не найдена</h4>
      </div>
      <div className="d-flex">
        <a type="button" className="text_color mx-3" onClick={() => navigate(-1)}>
          <h5>Назад</h5>
        </a>
        <a type="button" className="text_color mx-3" onClick={() => navigate(SEARCH_BAR_ROUTE)}>
          <h5>Домой</h5>
        </a>
      </div>
    </Container>
  );
}

export default NotFoundPage;
