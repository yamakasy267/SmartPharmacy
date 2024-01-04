import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._categories = []
        this._activeIngredients = []
        this._products = []
        this._selectedCategory = {}
        this._selectedActiveIngredient = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 1
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    setActiveIngredients(activeIngredients) {
        this._activeIngredients = activeIngredients
    }
    setProducts(products) {
        this._products = products
    }

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }
    setSelectedActiveIngredient(activeIngredient) {
        this.setPage(1)
        this._selectedActiveIngredient = activeIngredient
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get categories() {
        return this._categories
    }
    get activeIngredients() {
        return this._activeIngredients
    }
    get products() {
        return this._products
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get selectedActiveIngredient() {
        return this._selectedActiveIngredient
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
