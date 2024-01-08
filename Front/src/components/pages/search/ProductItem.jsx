import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Context} from "../../../index";
import {LOGIN_ROUTE} from "../../utils/Consts";
import {createFavorite} from "../../api/ProductAPI";
import Loading from "../../LoadingModule";

const ProductItem = ({product}) => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const {favoriteProducts} = useContext(Context)
  const [isFavorite, setFavorite] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setFavorite(favoriteProducts.products.find(favoriteProduct => favoriteProduct.pk === product.pk) !== undefined)
    setLoading(false)
  }, [])

  function createFavoriteProduct(id) {
    let data = createFavorite(id)
    setFavorite(true)
  }

  function removeFromFavorites(id) {
    setFavorite(false)
    // let data = createFavorite(id)
  }

  if (loading) { return <Loading/> }

  return (
    <div className="product h-100 d-flex flex-column px-4" onClick={() => navigate('/product/' + product.pk)}>
      <div className="d-flex justify-content-end pt-4">
        {user.isAuth ?
          <button type="button" className="p-0" onClick={e => {
            e.stopPropagation();
            isFavorite ? removeFromFavorites(product.pk) : createFavoriteProduct(product.pk)
          }}>
            <h4 className="product__info_stat">
              {isFavorite ?
                <i className="bi bi-heart-fill"></i>
                :
                <i className="bi bi-heart"></i>
              }
            </h4>
          </button>
          :
          <button type="button" className="p-0" onClick={e => {
            e.stopPropagation();
            navigate(LOGIN_ROUTE);
          }}>
            <h4 className="product__info_stat">
              <i className="bi bi-heart"></i>
            </h4>
          </button>
        }
      </div>

      <div className="h-100 d-flex align-items-center pb-4">
        <div className="px-4">
          {/*<img src={product.img} className="img-fluid" alt="Фото товара"/>*/}
          <img src="/assets/1.jpg" className="img-fluid" alt="Фото товара"/>
        </div>
      </div>
      <h5>{product.name}</h5>

      <div className="product__vendor pb-2">
        <h6>{product.producer}</h6>
      </div>
      <div className="product__info">
        <div className="product__info_border d-flex justify-content-between align-items-end">
          <h6>Aктивное в-во:</h6>
          {/*<h6 className="text-end">{product.substance}</h6>*/}
          <h6 className="text-end">{product.category__name}</h6>
        </div>
        <div className="product__info_border d-flex justify-content-between align-items-end">
          <h6>Форма:</h6>
          {/*<h6 className="text-end">{product.form}</h6>*/}
          <h6 className="text-end">таблетки</h6>
        </div>
        <div className="product__info_border d-flex justify-content-between align-items-end">
          <h6>Количество:</h6>
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
  );
};

export default ProductItem;
