import Container from "react-bootstrap/Container";
import {Spinner} from "react-bootstrap";
import React from "react";

const Loading = () => {
  return (
    <Container className="d-flex flex-fill justify-content-center align-items-center">
      <Spinner animation={"grow"}/>
    </Container>
  )
}

export default Loading;