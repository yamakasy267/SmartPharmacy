import React, {useState} from "react";
import {useNavigate} from "react-router";

// const ProductItem = ({product}) => {
const ProductItem = (product) => {
// function Product(product) {

    const navigate = useNavigate()
    return (
        <div className="product h-100 d-flex flex-column px-4" onClick={() => navigate('/product/' + product.id)}>
            <div className="d-flex justify-content-end pt-4">
                <button id="" type="button" className="p-0">
                    <h4 className="product__info_stat">
                        <i className="bi bi-heart"></i>
                    </h4>
                </button>
            </div>
            <div className="h-100 d-flex align-items-center pb-4">
                <div className="px-4">
                    <img src={product.img} className="img-fluid" alt="Фото товара"/>
                </div>
            </div>
            <h4>{product.title}</h4>
            <div className="product__vendor pb-2">
                <h6>{product.vendor}</h6>
            </div>
            <div className="product__info">
                <div className="product__info_border d-flex justify-content-between align-items-end">
                    <h5>Aктивное в-во</h5>
                    <h6 className="text-end">{product.substance}</h6>
                </div>
                <div className="product__info_border d-flex justify-content-between align-items-end">
                    <h5>Форма</h5>
                    <h6 className="text-end">{product.form}</h6>
                </div>
                <div className="product__info_border d-flex justify-content-between align-items-end">
                    <h5>Количество</h5>
                    <h6 className="text-end">{product.quantity} шт, по {product.weight} мг</h6>
                </div>
            </div>
            <div className="product__info_stat d-flex align-items-end justify-content-between py-3">
                <h5>
                    <i className="bi bi-eye"></i>
                    &nbsp;{product.favorite}
                </h5>
                <h4 className="fw-bold">
                    {product.price} &#x20bd;
                </h4>
            </div>
        </div>
    );
};

export default ProductItem;
