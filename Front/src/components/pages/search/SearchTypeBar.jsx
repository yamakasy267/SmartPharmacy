import React from "react";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {
  ANALOGUE_SEARCH_ROUTE,
  NAME_SEARCH_ROUTE,
  SEARCH_BAR_ROUTE,
  SYMPTOM_SEARCH_ROUTE
} from "../../utils/Consts";
import {observer} from "mobx-react-lite";
import MapModule from "../../Map";

const SearchTypeBar = observer(() => {
  const location = useLocation().pathname
  const searchTab = [
    {
      title: "Подобрать лекарство",
      content: "Введите ваши симптомы и мы найдем подходящий препарат",
      route: SYMPTOM_SEARCH_ROUTE
    },
    {
      title: "Найти аналоги",
      content: "Введите действующее вещество и мы найдем аналоги",
      route: ANALOGUE_SEARCH_ROUTE
    },
    {
      title: "Найти по названию",
      content: "Введите название препарата и мы покажем информацию о нем",
      route: NAME_SEARCH_ROUTE
    },
  ]

  return (
    <div className="d-flex flex-fill flex-column">
      <section className="position-relative d-flex flex-column container pb-5" id="search-type-section">
        <div className="container">
          <div className="text-center px-md-3">
            <nav className="d-flex flex-wrap justify-content-center">
              {
                searchTab.map(({title, content, route}, index) => (
                  <NavLink key={index} to={route}
                           className="search-type-section__label w-100 col-sm mx-md-4 mx-sm-2 mb-sm-0 mb-3">
                    <div className="h-100 d-flex flex-column justify-content-center p-4">
                      <h5 className="search-type-section__label-title mb-2">{title}</h5>
                      <h6 className="search-type-section__label-content">{content}</h6>
                    </div>
                  </NavLink>
                ))
              }
            </nav>
          </div>
        </div>
      </section>
      <Outlet/>
      { location === SEARCH_BAR_ROUTE &&
        <MapModule/>
      }
    </div>
  )
})

export default SearchTypeBar;
