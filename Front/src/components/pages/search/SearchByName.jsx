import ProductItem from "./ProductItem";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {Form, Spinner} from "react-bootstrap";
import {fetchMedicineByName} from "../../api/ProductAPI";
import Container from "react-bootstrap/Container";
import Pages from "../../Pages";

const SearchByName = () => {
  const {ProductStore} = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  function getMedicine() {
    setLoading(true)
    fetchMedicineByName(searchQuery).then(data => {
      ProductStore.setProducts(data["med"])
      ProductStore.setTotalCount(data["med"].length)
      setLoading(false)
    });
  }

  useEffect(() => {
    getMedicine()
  }, [])

  const onFormSubmit = e => {
    e.preventDefault();
    getMedicine()
  }

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
        <h6>Введите название препарата:</h6>
      </div>

      <Form className="d-flex flex-wrap mb-4" onSubmit={onFormSubmit}>
        <div className="items-section__search d-flex flex-fill mx-1">
          <Form.Control type="search" className="items-section__search-line w-100 p-2" placeholder="Поиск..."
                        aria-label="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="default-btn default-btn_rich-green_bg-white btn__border_rich-brown mx-1">
          Поиск
        </button>
      </Form>

      <div className="d-flex flex-wrap justify-content-center pb-4">
        {ProductStore._totalCount ?
          ProductStore.products.map((product, index) =>
            <div key={index} className="col-lg-3 col-md-4 col-6 p-1">
              <ProductItem product={product}/>
            </div>
          )
          :
          <Container className="d-flex flex-fill justify-content-center align-items-center">
            Ничего не найдено...
          </Container>
        }
      </div>

      <div className="items-section__page-num d-flex justify-content-center pb-4">
        <h5 className="fw-bold">1</h5>
        <h5>&ensp;&bull;&ensp;</h5>
        <h5 className="fw-bold">2</h5>
        <h5>&ensp;&bull;&ensp;</h5>
        <h5 className="fw-bold">3</h5>

        <Pages/>
      </div>

    </section>
  );
}

export default SearchByName;
