import ProductItem from "./ProductItem";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {Form} from "react-bootstrap";
import {fetchMedicineByName} from "../../api/ProductAPI";
import Pagination from "../../PaginationModule";
import Loading from "../../LoadingModule";
import {observer} from "mobx-react-lite";

const SearchByName = observer(() => {
  const {productStorage} = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  function getMedicine() {
    setLoading(true)
    fetchMedicineByName(searchQuery, productStorage.page * productStorage.limit, productStorage.limit).then(data => {
      productStorage.setProducts(data["med"])
      productStorage.setTotalCount(data.count)
      productStorage.setPage(0)
      setLoading(false)
    });
  }

  // useEffect(() => {
  //   fetchMedicineByName(searchQuery, productStorage.page * productStorage.limit, productStorage.limit).then(data => {
  //     productStorage.setProducts(data["med"])
  //     productStorage.setTotalCount(data.count)
  //     productStorage.setPage(0)
  //   });
  // }, [searchQuery])

  useEffect(() => {
    fetchMedicineByName(searchQuery, productStorage.page * productStorage.limit, productStorage.limit).then(data => {
      productStorage.setProducts(data["med"])
      productStorage.setTotalCount(data.count)
    });
  }, [productStorage.page])

  // useEffect(() => {
  //   getMedicine()
  // }, [])

  const onSearchSubmit = e => {
    e.preventDefault();
    getMedicine()
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <section id="items-section" className="container px-0 px-sm-5 mt-5">
      <div className="items-section__title d-flex p-1">
        <h6>Введите название препарата:</h6>
      </div>

      <Form className="d-flex flex-wrap mb-3" onSubmit={onSearchSubmit}>
        <div className="items-section__search d-flex flex-fill mx-1">
          <Form.Control type="search" className="items-section__search-line w-100 p-2" placeholder="Поиск..."
                        aria-label="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="default-btn default-btn_rich-green_bg-white btn__border_rich-brown mx-1">
          Поиск
        </button>
      </Form>

      {productStorage.totalCount ?
        <div className="p-1 mb-3">
          По вашему запросу найдено: {productStorage.totalCount}
        </div>
        :
        <div className="d-flex flex-fill justify-content-center align-items-center p-1">
          Ничего не найдено...
        </div>
      }

      <div className="d-flex flex-wrap justify-content-center pb-4">
        {productStorage.totalCount ?
          productStorage.products.map((product, index) =>
            <div key={index} className="col-lg-3 col-md-4 col-6 p-1">
              <ProductItem product={product}/>
            </div>
          ) : []
        }
      </div>

      <Pagination/>

      {/*<div className="items-section__page-num d-flex justify-content-center pb-4">*/}
      {/*  <h5 className="fw-bold">1</h5>*/}
      {/*  <h5>&ensp;&bull;&ensp;</h5>*/}
      {/*  <h5 className="fw-bold">2</h5>*/}
      {/*  <h5>&ensp;&bull;&ensp;</h5>*/}
      {/*  <h5 className="fw-bold">3</h5>*/}
      {/*</div>*/}

    </section>
  );
});

export default SearchByName;
