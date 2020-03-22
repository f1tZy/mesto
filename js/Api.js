export class Api {
    constructor(key){
        this.key=key;
    }
    requestUserInfo() {
        return  fetch(`${this.key.server}/users/me`, {
            headers: this.key.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                  }
              })
      }

    getInitialCards() {
        return  fetch(`${this.key.server}/cards`, {
            headers: this.key.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                 }
             })
             .then((result) => {
                if (result) {
                    return result
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            }

    renderUserInfo() {
        return  fetch(`${this.key.server}/users/me`, {
                headers: this.key.headers,
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                })
        }

    patchUserInfo(nameVal, aboutVal, popupEdit, api) {

        return fetch(`${this.key.server}/users/me`, {
            method: 'PATCH',
                headers: this.key.headers,
                body: JSON.stringify({
                    name: `${nameVal}`,
                    about: `${aboutVal}`
                    }),
                })
                .then(res => {
                    if (res.ok) {
                        api.renderUserInfo();
                        return res.json();
                    }
 
                    return Promise.reject(`Ошибка: ${res.status}`);
                })
                    .catch((err) => {
                        console.log(err)
                    })
                    .finally(() => {
                        popupEdit.classList.remove('popup_is-opened');
                    });
            }
    }

