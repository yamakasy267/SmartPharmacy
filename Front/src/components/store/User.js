import {makeAutoObservable} from "mobx";

export default class User {
  constructor() {
    this.isAuth_ = false
    this.id_ = {};
    this.name_ = {};
    this.email_ = {};
    this.birthdate_ = {};
    this.role_ = {};

    makeAutoObservable(this)
  }

  setAuth(bool) {
    this.isAuth_ = bool;
  }

  setUser(userData) {
    this.id_ = userData.pk;
    this.name_ = userData.name;
    this.email_ = userData.email;
    this.birthdate_ = userData.date_of_birth;
    this.role_ = userData.role__name;
  }

  get id() {
    return this.id_;
  }

  get name() {
    return this.name_;
  }

  get email() {
    return this.email_;
  }

  get birthdate() {
    return this.birthdate_;
  }

  get role() {
    return this.role_;
  }

  get isAuth() {
    return this.isAuth_;
  }

  get isAdmin() {
    return this.role_ === "admin";
  }

  get isModerator() {
    return this.role_ === "moderator";
  }

  get user() {
    return this;
  }

  logOut() {
    this.setUser({});
    this.setAuth(false);
    localStorage.removeItem('token');
  }
}
