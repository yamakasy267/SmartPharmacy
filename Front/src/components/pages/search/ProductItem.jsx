import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Context} from "../../../index";
import {LOGIN_ROUTE} from "../../utils/Consts";
import {createFavorite, deleteFavorite} from "../../api/ProductAPI";
import Loading from "../../LoadingModule";

const ProductItem = ({product}) => {
  const navigate = useNavigate();
  const {user} = useContext(Context);
  const {favoriteProducts} = useContext(Context);
  const [isFavorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFavorite(favoriteProducts.products.find(favoriteProduct => favoriteProduct.pk === product.pk) !== undefined);
    setLoading(false);
  }, [])

  function createFavoriteProduct(id) {
    favoriteProducts.products.push(product);
    createFavorite(id);
    setFavorite(true);
  }

  function removeFromFavorites(id) {
    favoriteProducts.products_.splice(favoriteProducts.products.findIndex(favoriteProduct => favoriteProduct.pk === id), 1);
    deleteFavorite(id);
    setFavorite(false);
  }

  if (loading) {
    return <Loading/>
  }

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
          <img src={product.image} className="img-fluid" alt="Фото товара"/>
        </div>
      </div>
      <h5>{product.name}</h5>

      <div className="product__vendor product__info_border pb-2">
        <h6>{product.producer}</h6>
      </div>
      <div className="product__info">
        {product.length !== 0 && product.element[0] !== null &&
          <div className="product__info_border d-flex flex-wrap justify-content-between">
            <h6>Aктивное в-во:</h6>
            <h6 className="">{product.element}</h6>
          </div>
        }
      </div>
      <div className="product__info_stat d-flex align-items-end justify-content-end py-3">
        <h4 className="fw-bold">
          {product.total_amount} &#x20bd;
        </h4>
      </div>
    </div>
  );
};

export default ProductItem;
