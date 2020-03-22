export class Card {

  //удаление карточки
  static remove(event, placeList) {
    placeList.removeChild(event.target.closest('.place-card'));
  }

  //проставление лайков у карточек
  static like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  //увеличение картинки
  static increaseImage(event) {
    const bigImg = document.querySelector('.popup-image__big');
    bigImg.src = event.target.getAttribute('imageURL');
    document.querySelector('.popup-image').classList.add('popup_is-opened');//открываем попап картинки
  }


  create(nameValue, linkValue) {
    const placeList = document.querySelector('.places-list');
    const placeCard = document.createElement('div');//создаем блок карточки
    placeCard.classList.add('place-card');
    placeList.appendChild(placeCard);

    const cardImage = document.createElement('div');//создаем блок картинки
    cardImage.classList.add('place-card__image');
    cardImage.setAttribute('imageURL', linkValue);
    placeCard.appendChild(cardImage);
    cardImage.style.backgroundImage = 'url(' + linkValue + ')';//делаем картинку через background

    const deleteIcon = document.createElement('button');//кнопка удалить
    deleteIcon.classList.add('place-card__delete-icon');
    cardImage.appendChild(deleteIcon);

    const cardDescription = document.createElement('div');//создаем блок описания
    cardDescription.classList.add('place-card__description');
    placeCard.appendChild(cardDescription);

    const cardName = document.createElement('h3');//создаем блок имени
    cardName.classList.add('place-card__name');
    cardDescription.appendChild(cardName);
    cardName.textContent = nameValue;

    // кнопка лайка
    const likeIcon = document.createElement('button');
    likeIcon.classList.add('place-card__like-icon');
    cardDescription.appendChild(likeIcon);

    return placeCard;
  }
}