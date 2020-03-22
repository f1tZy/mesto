class Popup {
    constructor(element,postBtn,postBtnEdit) {
        this.element = element;
        this.cardPostBtn=postBtn;//передаем кнопки для изменения состояния
        this.userPostBtn=postBtnEdit;

        //выбираем какой попап закрывать
        if (this.element.querySelector('.popup__close')) {

            this.element.querySelector('.popup__close')
                .addEventListener('click', this.close);
        }

        if (this.element.querySelector('.popup-edit__close')) {

            this.element.querySelector('.popup-edit__close')
                .addEventListener('click', this.close);
        }
    }

    open(event, validButton) {
        this.element.classList.add('popup_is-opened');
        if (event.target.matches(".user-info__button-edit")) {
            // validButton.enablePopUpButton(this.userPostBtn)//делаем активную кнопку при открытии попапа редактирования инф-ции
        }
        if (event.target.matches(".user-info__button")) {
            // validButton.disablePopUpButton(this.cardPostBtn)//делаем не активную кнопку при открытии попапа добавления картинки
        }
    }

    close(event) {
        //выбираем какой попап закрывать
        if (event.target.closest('.popup')) { event.target.closest('.popup').classList.remove('popup_is-opened'); }
        if (event.target.closest('.popup-edit')) { event.target.closest('.popup-edit').classList.remove('popup_is-opened'); }
        document.forms.new.reset();
    }
}