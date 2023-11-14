function Header() {
  return (
    <header className="w-100 position-fixed">
      <div className="container d-flex flex-wrap justify-content-between px-5 py-4">
        <div className="ps-0 ps-sm-6">
          <a href="" className="header__title">SmartPharmacy</a>
        </div>
        <div className="pe-0 pe-sm-6">
          <a type="button" className="header__log-in" data-bs-toggle="modal" data-bs-target="#exampleModal">Войти</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
