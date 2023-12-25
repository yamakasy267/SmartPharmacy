import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {ANALOGUE_SEARCH_ROUTE, NAME_SEARCH_ROUTE, SYMPTOM_SEARCH_ROUTE} from "../../utils/Consts";

function SearchTypeBar() {
  return (
    <div className="position-relative container d-flex flex-column pt-4">
      <section id="search-type-section">
        <div className="container">
          <div className="text-center px-md-3">
            <nav className="d-flex flex-wrap justify-content-center">
              <NavLink to={SYMPTOM_SEARCH_ROUTE} className="search-type-section__label col-sm mx-md-4 mx-sm-2 mb-sm-0 mb-3">
                <div className="p-4">
                  <h5 className="search-type-section__label-title mb-2">Подобрать лекарство</h5>
                  <h6 className="search-type-section__label-content">Введите ваши симптомы и мы найдем подходящий препарат</h6>
                </div>
              </NavLink>
              <NavLink to={ANALOGUE_SEARCH_ROUTE} className="search-type-section__label col-sm mx-md-4 mx-sm-2 mb-sm-0 mb-3">
                <div className="p-4">
                  <h5 className="search-type-section__label-title mb-2">Подобрать лекарство</h5>
                  <h6 className="search-type-section__label-content">Введите ваши симптомы и мы найдем подходящий препарат</h6>
                </div>
              </NavLink>
              <NavLink to={NAME_SEARCH_ROUTE} className="search-type-section__label col-sm mx-md-4 mx-sm-2 mb-sm-0 mb-3">
                <div className="p-4">
                  <h5 className="search-type-section__label-title mb-2">Подобрать лекарство</h5>
                  <h6 className="search-type-section__label-content">Введите ваши симптомы и мы найдем подходящий препарат</h6>
                </div>
              </NavLink>
            </nav>
          </div>
        </div>
      </section>
      <Outlet />
    </div>
  )
};

export default SearchTypeBar;
