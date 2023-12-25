import Symptom from "./Symptom";
import ProductItem from "./ProductItem";
import {getCategory, getMedicineByName} from "../../http/ProductAPI";

function SearchByAnalogue() {
  return (
    <section id="items-section" className="container px-0 px-sm-5 mt-5">
      <div className="items-section__title d-flex p-1">
        <h6>Введите действующее вещество:</h6>
      </div>
      <div className="d-flex mx-1 mb-4">
        <div className="items-section__search d-flex flex-fill align-items-center justify-content-between pt-1 ps-1 me-1">
          <div className="d-flex flex-wrap">
            <input type="text" className="items-section__search-item items-section__search-line d-inline-flex p-2 me-1 mb-1" placeholder="Поиск..." aria-label="search" aria-describedby="input-group-left" />
            <Symptom title="Головная боль" />
            <Symptom title="Головокружение" />
            <Symptom title="Повышенная температура" />
            <Symptom title="Боль в горле" />
          </div>
          <button type="button" className="items-section__search_drop-btn px-2 pb-1" id="input-group-button-right">
            <h5><i className="bi bi-x-lg"></i></h5>
          </button>
        </div>
        <div className="items-section__search_filter d-flex">
          <button type="button" className="items-section__search_filter-btn p-1" id="input-group-button-right">
            <h2><i className="bi bi-filter"></i></h2>
          </button>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center pb-4">
        <div className="col-lg-3 col-md-4 col-6 p-1">
          <ProductItem id="1" img="/assets/1.jpg" title="Название" vendor="Производитель"
            substance="вещество1, вещество2" form="таблетки" quantity="10"
            weight="500" favorite="228" price="200" />
        </div>
        <div className="col-lg-3 col-md-4 col-6 p-1">
          <ProductItem id="2" img="/assets/2.jpg" title="Название" vendor="Производитель"
            substance="вещество1, вещество2" form="таблетки" quantity="10"
            weight="500" favorite="228" price="200" />
        </div>
        <div className="col-lg-3 col-md-4 col-6 p-1">
          <ProductItem id="3" img="/assets/5.jpg" title="Название" vendor="Производитель"
            substance="вещество1, вещество2" form="таблетки" quantity="10"
            weight="500" favorite="228" price="200" />
        </div>
        <div className="col-lg-3 col-md-4 col-6 p-1">
          <ProductItem id="4" img="/assets/5.jpg" title="Название" vendor="Производитель"
            substance="вещество1, вещество2" form="таблетки" quantity="10"
            weight="500" favorite="228" price="200" />
        </div>
        <div className="col-lg-3 col-md-4 col-6 p-1">
          <ProductItem id="5" img="/assets/5.jpg" title="Название" vendor="Производитель"
            substance="вещество1, вещество2" form="таблетки" quantity="10"
            weight="500" favorite="228" price="200" />
        </div>
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

export default SearchByAnalogue;
