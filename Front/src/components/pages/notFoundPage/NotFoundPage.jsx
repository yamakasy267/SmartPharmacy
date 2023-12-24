import { Link } from "react-router-dom";

import './NotFoundPage.css';
import Container from "react-bootstrap/Container";

function NotFoundPage() {
  return (
    <Container className="d-flex flex-column flex-fill justify-content-center align-items-center p-4">
      <div className="pb-3">
        <h4>Cтраница не найдена</h4>
      </div>
      <Link to="/search/by-symptom">
        <h4>Домой</h4>
      </Link>
    </Container>
  );
}

export default NotFoundPage;
