import {makeAutoObservable} from "mobx";

export default class FavoriteProductStorage {
  constructor() {
    makeAutoObservable(this);
  }

  products_ = [];

  get products() {
    return this.products_;
  }

  setProducts(products) {
    this.products_ = products;
  }
}
