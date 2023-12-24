import {makeAutoObservable} from "mobx";

// const user = new User('John', 'boba2@gmail.com', '1445', '2001-01-01');

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._name = {};
        this._email = {};
        this._password = {};
        this._date_of_birth = {};

        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._name = user;
        this._email = user;
        this._password = user;
        this._date_of_birth = user;
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this
    }
}
