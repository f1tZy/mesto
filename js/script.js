import "../pages/index.css";

//создаем переменные
const placeList = document.querySelector('.places-list');
const popupEdit = document.querySelector(".popup-edit");
const openPopupEdit = document.querySelector(".user-info__button-edit");
const postBtnEdit = document.querySelector(".popup-edit__button");
const userName = document.querySelector(".user-info__name");
const userJob = document.querySelector(".user-info__job");
const popUpBigImage = document.querySelector('.popup-image');
const iconCloseBig = document.querySelector('.popup-image__close');
const userForm = document.forms.user;//форма пользователя
const cardForm = document.forms.new;//форма карточки
const popup = document.querySelector(".popup");
const openAddCardPopup = document.querySelector(".user-info__button");
const userInfo = document.querySelector(".user-info");
const popupForm = document.querySelector(".popup__form");
const postBtn = document.querySelector(".popup__button");
const placeName = document.querySelector(".popup__input_type_name");
const placeLink = document.querySelector(".popup__input_type_link-url");
const words = {
  validationLenght: 'Должно быть от 2 до 30 символов',
  strictly: 'Это обязательное поле',
  link: 'Здесь должна быть ссылка'
  };
const initialCards = [];//массив для карточек

//Открытие попапа карточки
const popupCardOpen = new Popup(popup);
openAddCardPopup.addEventListener('click', function (event) {
    const validButton=new FormValidator();//вытаскиваем валидатор
    popupCardOpen.open(event, validButton);//передаем валидатор чтобы при открытии менялось состояние кнопки
});

//открытие попапа пользователя
const popupEditOpen = new Popup(popupEdit);
openPopupEdit.addEventListener('click', function (event) {
    const validButton=new FormValidator();//вытаскиваем валидатор
    popupEditOpen.open(event, validButton);//передаем валидатор чтобы при открытии менялось состояние кнопки
});


//вызывает обработчика куда вводятся данные для дальнейшей валидации
function setEventListeners() {
  cardForm.addEventListener('input', function(event){
    const validator=new FormValidator(event.target);
    validator.setSubmitButtonStateCard()})
  userForm.addEventListener('input', function(event){
    const validator=new FormValidator(event.target);
    validator.setSubmitButtonStateUser()});
}
setEventListeners();

//передача инф-ции пользовалтеля
userInfo.addEventListener('click', function (event) {
  if (event.target.matches(".button")) {
      const userInfoSet=new UserInfo(userName, userJob);
      userInfoSet.setUserInfo(userForm.elements);
  }
});

//сохранение инф-ции пользователя
popupEdit.addEventListener('click', function (event) {
if (event.target.matches(".button")) {
    event.preventDefault();
    api.patchUserInfo(userForm.elements.description.value, userForm.elements.info.value)
      .then(()=>{
    const saveInfo = new UserInfo(userName, userJob);
    saveInfo.updateUserInfo(userForm.elements);
      })
  } 
});


//слушатель submit для формы
cardForm.addEventListener('submit', addNewCard);


//закрыть увеличение картинки
function closeShowImg() {
    popUpBigImage.classList.remove('popup_is-opened');
}
iconCloseBig.addEventListener('click', closeShowImg);

//создаем Апи
const api = new Api({
  server: 'https://praktikum.tk/cohort8',
  headers: {
      authorization: '9c07bd70-82ce-4582-b1b7-e0c8dccb8ffd',
      'Content-Type': 'application/json'
  }
});;

//передаем инфу с сервера на сайт
api.renderUserInfo()
  .then(result => {
      userName.textContent = result.name;
      userJob.textContent = result.about;
  })
  .catch((err) => {
      console.log(err)
  });


//рендерим карточки с сервера
api.getInitialCards()
  .then(result => {
      result.forEach(function (element) {
          initialCards.push(element);
      });
    
      newCardList.render();
  })
  .catch((err) => {
      console.log(err)
  });

//создаем cardList
const cardNew = new Card();
const newCardList = new CardList(placeList, initialCards, cardNew, popup);

//добавление новой карточки в список
function addNewCard(event) {
    event.preventDefault();
    const newName = placeName.value;
    const newLink = placeLink.value;
    newCardList.addCard(newName, newLink);
    popupForm.reset();
  }

//вызовы методов лайк, удаление, увеличение картинки
function clickAction(event) {
if (event.target.classList.contains('place-card__delete-icon')) {
    Card.remove(event, placeList);
    }
if (event.target.classList.contains('place-card__like-icon')) {
    Card.like(event);
    }
if (event.target.classList.contains('place-card__image')) {
    Card.increaseImage(event);
    }
  }
placeList.addEventListener('click', clickAction)//слушатель на функцию
