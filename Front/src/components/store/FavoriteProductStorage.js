import {makeAutoObservable} from "mobx";

export default class FavoriteProductStorage {
  constructor() {
    this.products_ = [];
    makeAutoObservable(this);
  }

  get products() {
    return this.products_;
  }

  setProducts(products) {
    this.products_ = products;
  }
}
