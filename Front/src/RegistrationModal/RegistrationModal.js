function RegistrationModal() {
  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modalew p-4">
          <div id="exampleModalLabel" class="d-flex justify-content-end">
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button> -->
            <button type="button" class="cancel-btn " id="input-group-button-right" data-bs-dismiss="modal" >
              <i class="bi bi-x-lg ewgwg px-1"></i>
            </button>
          </div>
          <div class="modalbody d-flex flex-column p-3">
            <div class="w-100 d-flex flex-column pb-4">
              <h6 class="pb-1">Email:</h6>
              <input type="email" class="modal_input d-flex" id="formControlInput" placeholder="name@example.com">
            </div>

            <div class="w-100 d-flex flex-column ">
              <h6 class="pb-1">Password:</h6>
              <input type="password" class="modal_input d-flex" id="formControlInput1">
            </div>

          </div>
          <div class="d-flex justify-content-between align-items-center p-3">


            <div class="">
              <a type="button" class="modal__log-in">Зарегистрироваться</a>
            </div>
            <div class="">
              <a type="button" class="modal__log-in">Восcтановить пароль</a>
            </div>

            <button href="tip.html" type="button" class="p-0">
              <img src="img/arrow-right.svg" alt="Вперёд">
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationModal;
