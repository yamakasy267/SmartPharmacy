import './Personal.css';

import PersonalInfo from "./PersonalInfo";
import ProductItem from "../search/ProductItem";

function Personal() {
  return (
    <div className="container d-flex">
      <div className="personal__favorite col-lg-9 col-md-8 col">

        <div className="d-md-none d-block p-1">
          <PersonalInfo />
        </div>

        <div className="d-flex flex-wrap justify-content-center">

          <div className="col-xl-3 col-lg-4 col-sm-6 col-6 p-1">
            <ProductItem id="1" img="/assets/2.jpg" title="Название" vendor="Производитель"
              substance="вещество1, вещество2" form="таблетки" quantity="10"
              weight="500" favorite="228" price="200" />
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6 col-6 p-1">
            <ProductItem id="2" img="/assets/2.jpg" title="Название" vendor="Производитель"
              substance="вещество1, вещество2" form="таблетки" quantity="10"
              weight="500" favorite="228" price="200" />
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6  col-6 p-1">
            <ProductItem id="3" img="/assets/2.jpg" title="Название" vendor="Производитель"
              substance="вещество1, вещество2" form="таблетки" quantity="10"
              weight="500" favorite="228" price="200" />
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6 col-6 p-1">
            <ProductItem id="4" img="/assets/2.jpg" title="Название" vendor="Производитель"
              substance="вещество1, вещество2" form="таблетки" quantity="10"
              weight="500" favorite="228" price="200" />
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6 col-6 p-1">
            <ProductItem id="5" img="/assets/2.jpg" title="Название" vendor="Производитель"
              substance="вещество1, вещество2" form="таблетки" quantity="10"
              weight="500" favorite="228" price="200" />
          </div>

        </div>
      </div>

      <div className="d-md-block d-none col-lg-3 col-md-4 p-1">
        <PersonalInfo />
      </div>

    </div>
  );
}

export default Personal;
