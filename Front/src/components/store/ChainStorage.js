import {makeAutoObservable} from "mobx";

export default class ChainStorage {
  constructor() {
    makeAutoObservable(this);
  }

  chains_ = [];

  get chains() {
    return this.chains_;
  }

  setChains(chains) {
    this.chains_ = chains;
  }
}
