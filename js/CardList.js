class CardList {

    constructor(container, cards, cardNew, popup) {
        this.container = container;
        this.cards = cards;
        this.cardNew = cardNew;
        this.popup=popup;
    }

    //новая карточка
    addCard(nameValue, linkValue) {
        const place = this.cardNew.create(nameValue, linkValue);
        this.container.appendChild(place);
        this.popup.classList.remove('popup_is-opened');
    }

    //рендер списка карточек
    render() {
        for(let {name, link} of this.cards){
            this.addCard(name, link);
        };
    }
}
