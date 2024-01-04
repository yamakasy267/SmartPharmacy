import './Personal.css';

import PersonalInfo from "./PersonalInfo";
import ProductItem from "../search/ProductItem";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {fetchFavorites} from "../../api/ProductAPI";
import {Spinner} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const PersonalPage = () => {
  const {FavoriteProducts} = useContext(Context)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchFavorites().then(data => {
      FavoriteProducts.setProducts(data["views"])
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <Container className="d-flex flex-fill justify-content-center align-items-center">
        <Spinner animation={"grow"}/>
      </Container>
    )
  }

  return (
    <div className="container d-flex">
      <div className="personal__favorite col-lg-9 col-md-8 col">
        <div className="d-md-none d-block p-1">
          <PersonalInfo/>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {FavoriteProducts.products.map((product, index) =>
            <div key={index} className="col-xl-3 col-lg-4 col-sm-6 col-6 p-1">
              <ProductItem product={product}/>
            </div>
          )}
        </div>
      </div>
      <div className="d-md-block d-none col-lg-3 col-md-4 p-1">
        <PersonalInfo/>
      </div>
    </div>
  );
}

export default PersonalPage;
