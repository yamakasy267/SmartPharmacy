import {makeAutoObservable} from "mobx";

export default class CategoryStorage {
  constructor() {
    makeAutoObservable(this);
  }

  categories_ = [];

  get categories() {
    return this.categories_;
  }

  setCategories(categories) {
    this.categories_ = categories;
  }
}
