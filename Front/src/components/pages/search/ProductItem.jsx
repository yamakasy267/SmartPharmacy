import React, {useState} from "react";
import {useNavigate} from "react-router";

const ProductItem = ({product}) => {
  const navigate = useNavigate()
  return (
    <div className="col-lg-3 col-md-4 col-6 p-1">
      <div className="product h-100 d-flex flex-column px-4" onClick={() => navigate('/product/' + product.pk)}>
        <div className="d-flex justify-content-end pt-4">
          <button id="" type="button" className="p-0">
            <h4 className="product__info_stat">
              <i className="bi bi-heart"></i>
            </h4>
          </button>
        </div>
        <div className="h-100 d-flex align-items-center pb-4">
          <div className="px-4">
            {/*<img src={product.img} className="img-fluid" alt="Фото товара"/>*/}
            <img src="/assets/1.jpg" className="img-fluid" alt="Фото товара"/>
          </div>
        </div>
        <h4>{product.name}</h4>

        <div className="product__vendor pb-2">
          <h6>{product.producer}</h6>
        </div>
        <div className="product__info">
          <div className="product__info_border d-flex justify-content-between align-items-end">
            <h5>Aктивное в-во</h5>
            {/*<h6 className="text-end">{product.substance}</h6>*/}
            <h6 className="text-end">{product.category__name}</h6>
          </div>
          <div className="product__info_border d-flex justify-content-between align-items-end">
            <h5>Форма</h5>
            {/*<h6 className="text-end">{product.form}</h6>*/}
            <h6 className="text-end">таблетки</h6>
          </div>
          <div className="product__info_border d-flex justify-content-between align-items-end">
            <h5>Количество</h5>
            {/*<h6 className="text-end">{product.quantity} шт, по {product.weight} мг</h6>*/}
            <h6 className="text-end">{product.quantity} шт, по 500 мг</h6>
          </div>
        </div>
        <div className="product__info_stat d-flex align-items-end justify-content-between py-3">
          <h5>
            <i className="bi bi-eye"></i>
            {/*&nbsp;{product.favorite}*/}
            &nbsp;228
          </h5>
          <h4 className="fw-bold">
            {/*{product.price} &#x20bd;*/}
            {product.total_amount} &#x20bd;
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
