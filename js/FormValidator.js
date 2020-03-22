class FormValidator {

  //валидатор
  checkInputValidity(element, words) {
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

  //кнопка попапа ПОЛЬЗОВАТЕЛЯ(проверяем проходит ли валидацию и меняем состояние кнопки, передаем инпуты формы, кнопку которая меняет состояние, массив ошибок)
  setSubmitButtonStateUser(inputUserName, inputUserInfo, postBtnEdit, words) {
    const userName = this.checkInputValidity(inputUserName, words);
    const userJob = this.checkInputValidity(inputUserInfo, words);
    if (userName && userJob) { this.enablePopUpButton(postBtnEdit); }
    else { this.disablePopUpButton(postBtnEdit); }
  }

  //кнопка попапа КАРТОЧКИ(проверяем проходит ли валидацию и меняем состояние кнопки, передаем инпуты формы, кнопку которая меняет состояние, массив ошибок)
  setSubmitButtonStateCard(inputCardName, inputCardLink, postBtn, words) {
    const nameCard = this.checkInputValidity(inputCardName, words);
    const urlCard = this.checkInputValidity(inputCardLink, words);
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
