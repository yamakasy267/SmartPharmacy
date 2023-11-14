function Search() {
  return (
    <div className="body__inner position-relative d-flex flex-column container">
      <section id="search-section">
        <div className="container">
          <div className="text-center px-md-3">
            <nav className="d-flex justify-content-center nav" id="pills-tab" role="tablist">
              <a className="search-section__label col-sm mx-md-4 mx-sm-2 mb-3 mb-sm-0 active" id="pills-home-tab" data-bs-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                <div className=" p-4">
                  <h5 className="search-section__label-title mb-2">Подобрать лекарство</h5>
                  <h6 className="search-section__label-content">Введите ваши симптомы и мы найдем подходящий препарат</h6>
                </div>
              </a>
              <a className="search-section__label col-sm p-0 mx-md-4 mx-sm-2 mb-3 mb-sm-0" id="pills-profile-tab" data-bs-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                <div className="p-4">
                  <h5 className="search-section__label-title mb-2">Подобрать лекарство</h5>
                  <h6 className="search-section__label-content">Введите ваши симптомы и мы найдем подходящий препарат</h6>
                </div>
              </a>
              <a className="search-section__label col-sm p-0 mx-md-4 mx-sm-2" id="pills-disabled-tab" data-bs-toggle="pill" href="#pills-disabled" role="tab" aria-controls="pills-disabled" aria-disabled="true">
                <div className=" p-4">
                  <h5 className="search-section__label-title mb-2">Подобрать лекарство</h5>
                  <h6 className="search-section__label-content">Введите ваши симптомы и мы найдем подходящий препарат</h6>
                </div>
              </a>
            </nav>
          </div>

        </div>
      </section>

      <section id="items-section" className="container px-0 px-sm-5 mt-5">

        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div className="d-flex justify-content-center flex-column">
              <div className="d-flex flex-column px-1 pb-4">
                <div className="items-section__title d-flex pb-1">Введите ваши симптомы:</div>
                <div className="d-flex">
                  <div className="flex-fill items-section__search d-flex align-items-center justify-content-between pt-1 ps-1">
                    <div  className="d-flex flex-wrap">
                      <input type="text" className="items-section__search-item d-inline-flex p-2 me-1 mb-1 form3 p-0 me-1 mb-1" placeholder="Поиск..." aria-label="search" aria-describedby="input-group-left" />
                      <div id="like_button_container" className="">
                        <div className="items-section__search-item d-inline-flex p-2 mb-1">
                          <div className="text pe-2">Головная боль</div>
                          <button id="input-group-button-right" type="button" className="cancel-btn d-flex align-items-center px-0">
                            <i className="bi bi-x-lg ewgwg1"></i>
                          </button>
                        </div>
                        <div className="items-section__search-item d-inline-flex p-2 mb-1">
                          <div className="text pe-2">Головная боль</div>
                          <button id="input-group-button-right" type="button" className="cancel-btn d-flex align-items-center px-0">
                            <i className="bi bi-x-lg ewgwg1"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button type="button" className="cancel-btn px-2 pb-1" id="input-group-button-right">
                      <i className="bi bi-x-lg ewgwg px-1"></i>
                    </button>
                  </div>
                  <div className="d-flex ps-1">
                    <button type="button" className="cancel-btn py-1 filt" id="input-group-button-right">
                      <i className="bi bi-filter gewhwh"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap justify-content-center">

                <div className="col-lg-3 col-md-4 col-6 p-1">
                  <div className="h-100 prek d-flex flex-column px-4">
                    <div className="d-flex justify-content-end pt-4">
                      <i className="bi bi-heart heart"></i>
                    </div>
                    <div className="h-100 d-flex align-items-center">
                      <div className="px-4">
                        <img src={require('../img/2.jpg')} className="img-fluid" alt="" />
                      </div>
                    </div>
                    <div className="name pt-4">Название</div>
                    <div className="vendor pb-2">Производитель</div>
                    <div className="rewen">
                      <div className="d-flex justify-content-between align-content-end lined">
                        <div className="characteristic-title">Aктивное в-во</div>
                        <div className="characteristic-value">вещество1, вещество2</div>
                      </div>
                      <div className="d-flex justify-content-between lined">
                        <div className="characteristic-title">Форма</div>
                        <div className="characteristic-value">таблетки</div>
                      </div>
                      <div className="d-flex justify-content-between lined">
                        <div className="characteristic-title">Количество</div>
                        <div className="characteristic-value">10 шт, по 500 мг</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between py-3">
                      <div className="watchers">
                        <i className="bi bi-eye"></i>
                        <span className="">228</span>
                      </div>
                      <div className="cost">
                        <span className="">200</span>
                        <span className="">&#x20bd;</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <div className="page d-flex justify-content-center py-4">
              <div>1</div>
              <span>&ensp;&bull;&ensp;</span>
              <div>2</div>
            </div>
          </div>
          <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <div className="d-flex justify-content-center"></div>
          </div>
          <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab">
            <div className="d-flex justify-content-center"></div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Search;
