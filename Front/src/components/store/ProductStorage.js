import {makeAutoObservable} from "mobx";
export default class productStorage {
  constructor() {
    this.products_ = [];
    this.totalCount_ = 0;
    this.page_ = 0;
    this.limit_ = 8;
    makeAutoObservable(this);
  }

  get products() {
    return this.products_;
  }

  setProducts(products) {
    this.products_ = products;
  }

  get totalCount() {
    return this.totalCount_;
  }

  setTotalCount(count) {
    this.totalCount_ = count;
  }

  get page() {
    return this.page_;
  }

  setPage(page) {
    this.page_ = page;
  }

  get limit() {
    return this.limit_;
  }
}

// export default class productStorage {
//   constructor() {
//     this.products_ = [];
//     this.totalCount_ = 0;
//     this.page_ = 0;
//     this.limit_ = 8;
//     // this.categories_ = [];
//     // this.activeElements_ = [];
//     // this.selectedCategory_ = {};
//     // this.selectedActiveElement_ = {};
//     makeAutoObservable(this);
//   }
//
//   get products() {
//     return this.products_;
//   }
//
//   setProducts(products) {
//     this.products_ = products;
//   }
//
//   get totalCount() {
//     return this.totalCount_;
//   }
//
//   setTotalCount(count) {
//     this.totalCount_ = count;
//   }
//
//   get page() {
//     return this.page_;
//   }
//
//   setPage(page) {
//     this.page_ = page;
//   }
//
//   get limit() {
//     return this.limit_;
//   }
//
//   // get categories() {
//   //   return this.categories_;
//   // }
//   // set categories(categories) {
//   //   this.categories_ = categories
//   // }
//   // get activeElements() {
//   //   return this.activeElements_;
//   // }
//   // set activeElements(activeElements) {
//   //   this.activeElements_ = activeElements
//   // }
//   // get selectedCategory() {
//   //   return this.selectedCategory_;
//   // }
//   // set selectedCategory(category) {
//   //   this.page_(1);
//   //   this.selectedCategory_ = category;
//   // }
//   // get selectedActiveElement() {
//   //   return this.selectedActiveElement_;
//   // }
//   // setSelectedActiveElement(activeElement) {
//   //   this.page_(1);
//   //   this.selectedActiveElement_ = activeElement;
//   // }
// }
