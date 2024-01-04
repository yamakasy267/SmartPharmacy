import {makeAutoObservable} from "mobx";


export default class UserStore {
  constructor() {
    this.isAuth_ = false
    this.name_ = {};
    this.email_ = {};
    this.birthdate_ = {};
    this.role_ = {};

    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this.isAuth_ = bool
  }

  setUser(userData) {
    this.name_ = userData.name;
    this.email_ = userData.email;
    this.birthdate_ = userData.date_of_birth;
    this.role_ = userData.role__name;
  }

  get isAuth() {
    return this.isAuth_
  }

  get isAdmin() {
    return this.role_ === "admin"
  }

  get user() {
    return this
  }

  logOut() {
    this.setUser({})
    this.setIsAuth(false)
  }
}
