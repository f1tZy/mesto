class FormValidator {

  constructor(){
    this.cardForm=cardForm;//передаем формы для проверки валидности
    this.userForm=userForm;
  }

  //валидатор
  checkInputValidity(element) {
    this.error = document.querySelector(`.error-${element.name}`);//общяя переменная для ошибки всех инпутов, при введении инф-ы 
    if (!element.validity.valid) {
      if (element.validity.typeMismatch) { this.error.textContent = words.link; }
      if (element.value.length < Number(element.getAttribute('minlength'))) {
        if (element.validity.valueMissing) { this.error.textContent = words.strictly; }
        else { this.error.textContent = words.validationLenght; }
        return false;
      }
    } else {
      this.error.textContent = '';
      return true;
    }
  }

  //кнопка попапа пользователя(проверяем проходит ли валидацию и меняем состояние кнопки)
  setSubmitButtonStateUser() {
    const userName = this.checkInputValidity(this.userForm.elements.description);
    const userJob = this.checkInputValidity(this.userForm.elements.info);
    if (userName && userJob) { this.enablePopUpButton(postBtnEdit); }
    else { this.disablePopUpButton(postBtnEdit); }
  }

  //кнопка попапа карточки(проверяем проходит ли валидацию и меняем состояние кнопки)
  setSubmitButtonStateCard() {
    const nameCard = this.checkInputValidity(this.cardForm.elements.name);
    const urlCard = this.checkInputValidity(this.cardForm.elements.link);
    if (nameCard && urlCard) { this.enablePopUpButton(postBtn); }
    else { this.disablePopUpButton(postBtn); }
  }

  //неактивная кнопка
  disablePopUpButton(button) {
    button.setAttribute('disabled', '');
    button.classList.remove('popup__button_enable')
    button.classList.add('popup__button_disabled');
  }

  //активная кнопка
  enablePopUpButton(button) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_disabled');
    button.classList.add('popup__button_enable')
  }
}
