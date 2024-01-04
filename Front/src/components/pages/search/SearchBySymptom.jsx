import Symptom from "./Symptom";
import ProductItem from "./ProductItem";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {fetchMedicineByName} from "../../api/ProductAPI";
import Container from "react-bootstrap/Container";
import {Spinner} from "react-bootstrap";

const SearchBySymptom = () => {
  const {ProductStore} = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchMedicineByName("").then(data => {
      ProductStore.setProducts(data["med"])
      ProductStore.setTotalCount(data["med"].length)
      setLoading(false)
    });
  }, [])

  useEffect(() => {
    fetchMedicineByName(searchQuery).then(data => {
      ProductStore.setProducts(data["med"])
      ProductStore.setTotalCount(data["med"].length)
    });
  }, [searchQuery])

  if (loading) {
    return (
      <Container className="d-flex flex-fill justify-content-center align-items-center">
        <Spinner animation={"grow"}/>
      </Container>
    )
  }

  return (
    <section id="items-section" className="container px-0 px-sm-5 mt-5">

      <div className="items-section__title d-flex p-1">
        <h6>Введите симптомы:</h6>
      </div>
      <div className="d-flex mx-1 mb-4">
        <div
          className="items-section__search d-flex flex-fill align-items-center justify-content-between me-1">
          <div className="d-flex flex-wrap">
            <input type="text"
                   className="items-section__search-item items-section__search-line d-inline-flex p-2"
                   placeholder="Поиск..." aria-label="search" aria-describedby="input-group-left"/>
            <Symptom title="Головная боль"/>
            <Symptom title="Головокружение"/>
            <Symptom title="Повышенная температура"/>
            <Symptom title="Боль в горле"/>
          </div>
          <button type="button" className="items-section__search_drop-btn px-2 pb-1" id="input-group-button-right">
            <h5><i className="bi bi-x-lg"></i></h5>
          </button>
        </div>

        <div className="items-section__search_filter btn-group d-flex">
          <button className="items-section__search_filter-btn p-1 " type="button" id="dropdownMenuClickableInside"
                  data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            <h3><i className="bi bi-filter"></i></h3>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuClickableInside">
            <li>
              <div className="dropdown-item1">
                <div className="d-flex align-items-center">
                  <input className="form-check-input m-0" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                  <label className="form-check-label ps-2" htmlFor="flexRadioDefault1">
                    По убыванию цены
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown-item1">
                <div className="d-flex align-items-center">
                  <input className="form-check-input m-0" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                  <label className="form-check-label ps-2" htmlFor="flexRadioDefault2">
                    По возрастанию цены
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center pb-4">
        {ProductStore.products.map((product, index) =>
          <div key={index} className="col-lg-3 col-md-4 col-6 p-1">
            <ProductItem product={product}/>
          </div>
        )}
      </div>

      <div className="items-section__page-num d-flex justify-content-center pb-4">
        <h5 className="fw-bold">1</h5>
        <h5>&ensp;&bull;&ensp;</h5>
        <h5 className="fw-bold">2</h5>
        <h5>&ensp;&bull;&ensp;</h5>
        <h5 className="fw-bold">3</h5>
      </div>
    </section>
  );
}

export default SearchBySymptom;
