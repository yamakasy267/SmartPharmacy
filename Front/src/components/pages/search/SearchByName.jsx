import ProductItem from "./ProductItem";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {Button, Form} from "react-bootstrap";
import {getActiveIngredients, getCategories, getMedicineByName} from "../../http/ProductAPI";

function SearchByName() {
  const {user} = useContext(Context)
  const {ProductStore} = useContext(Context)

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getMedicineByName(searchQuery).then(data => {
      // console.log(data["med"])
      ProductStore.setProducts(data["med"])
    });
  }, [searchQuery]);

  return (
    <section id="items-section" className="container px-0 px-sm-5 mt-5">
      <div className="items-section__title d-flex p-1">
        <h6>Введите название препарата:</h6>
      </div>

      <Form className="d-flex flex-wrap mb-4">
        <div className="items-section__search d-flex flex-fill mx-1">
          <Form.Control type="search" className="items-section__search-line w-100 p-2" placeholder="Поиск..."
                        aria-label="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="button"
                className="default-btn default-btn_rich-green_bg-white btn__border_rich-brown mx-1">Поиск
        </button>
        <div className="items-section__search_filter d-flex mx-1">
          <button type="button" className="items-section__search_filter-btn p-1">
            <h4><i className="bi bi-filter"></i></h4>
          </button>
        </div>
      </Form>

      <div className="d-flex flex-wrap justify-content-center pb-4">
        {ProductStore.products.map(product =>
            <ProductItem key={product.pk} product={product} />
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

export default SearchByName;
