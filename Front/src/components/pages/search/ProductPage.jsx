import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {
  createComment,
  createFavorite,
  deleteFavorite,
  fetchMedicine
} from "../../api/ProductAPI";
import {Context} from "../../../index";
import {Form} from "react-bootstrap";
import {LOGIN_ROUTE} from "../../utils/Consts";
import {useNavigate} from "react-router";
import Loading from "../../LoadingModule";
import Comment from "./Comment";

const ProductPage = () => {
  const {user} = useContext(Context)
  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const {favoriteProducts} = useContext(Context)
  const [isFavorite, setFavorite] = useState(false)
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  function getMedicine(id) {
    setLoading(true)
    fetchMedicine(id).then((data) => {
      setProduct(data["med"][0]);
      setComments(data["med"][0].comments);
      setLoading(false)
    });
  }

  useEffect(() => {
    getMedicine(id)
    setLoading(true)
    setFavorite(favoriteProducts.products.find(favoriteProduct => favoriteProduct.pk === Number(id)) !== undefined)
    setLoading(false)
  }, []);

  function commentsCheck(comments) {
    if (comments.length > 0) {
      return comments[0].user !== null && comments[0].text !== null;
    }
    return false
  }

  function trimWhitespaces(str) {
    str = str.replace(/^\s+/, '');
    for (let i = str.length - 1; i >= 0; i--) {
      if (/\S/.test(str.charAt(i))) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return str;
  }

  const onCreateComment = e => {
    e.preventDefault();
    if (trimWhitespaces(newComment)) {
      try {
        let data = createComment(product.pk, newComment)
        getMedicine(id)
      } catch (e) {
        alert(e)
      }
    }
  }

  function createFavoriteProduct(id) {
    favoriteProducts.products.push(product);
    let data = createFavorite(id);
    setFavorite(true);
  }

  function removeFromFavorites(id) {
    favoriteProducts.products_.splice(favoriteProducts.products.findIndex(favoriteProduct => favoriteProduct.pk === id), 1);
    let data = deleteFavorite(id);
    setFavorite(false);
  }

  if (loading) {
    return <Loading/>
  }

  console.log(product)

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="product col-8 d-flex flex-column px-4 pt-4 pb-5">
        <div className="d-flex justify-content-end">
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

        <div className="d-flex px-5">
          <div className="col-5 h-100 align-self-center text-center">
            <img src={product.image} className="img-fluid h-100 w-50" alt="Фото товара"/>
          </div>
          <div className="col-7 ps-5 align-self-center">
            <h5 className="pb-1">{product.name}</h5>
            <h6 className="pb-2">{product.producer}</h6>
            <div className="product__info">
              <div
                className="product__info_border d-flex justify-content-between align-items-center text-end pt-2 pb-1">
                <h5 className="text-start">Категория</h5>
                &emsp;
                <h6 className="text-end">{product.category__name}</h6>
              </div>
              {product.length !== 0 && product.element[0] !== null &&
                <div className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                  <h5 className="text-start">Aктивное в-во</h5>
                  &emsp;
                  <h6 className="text-end">{product.element}</h6>
                </div>
              }
              <div className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                <h5 className="text-start">Форма</h5>
                &emsp;
                <h6 className="text-end">{product.release_form}</h6>
              </div>
              <div className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                <h5 className="text-start">Количество</h5>
                &emsp;
                <h6 className="text-end">{product.quantity} шт.</h6>
              </div>
              <div className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                <h5 className="text-start">Цена</h5>
                &emsp;
                <h6 className="text-end">{product.total_amount}&#x20bd;</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {commentsCheck(comments) ?
        <div className="col-7 d-flex flex-column m-4">
          {comments.map((comment, index) =>
            <Comment key={index} comment={comment}/>
          )}
        </div>
        :
        <div className="comment comment__info col-7 d-flex m-4 p-4">
          У этого товара ещё нет комментариев...
        </div>
      }

      {/*<div className="d-flex m-2">*/}
      {/*  <div className="comment__nesting-line d-flex flex-fill mx-4"></div>*/}
      {/*  <div className="comment d-flex flex-column p-4">*/}
      {/*    <div className="comment__info pb-2">*/}
      {/*      <div className="d-flex justify-content-between pb-4">*/}
      {/*        <div className="d-flex align-items-center px-5">*/}
      {/*          <h6 className="fw-bold">ramsesmiron</h6>*/}
      {/*          &emsp;&emsp;&emsp;*/}
      {/*          <h6>месяц назад</h6>*/}
      {/*        </div>*/}
      {/*        <div>*/}
      {/*          <h6 className="comment__affiliation py-1 px-4">Вы</h6>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <h6 className="px-5">*/}
      {/*        <span>@amyrobson&ensp;</span>*/}
      {/*      </h6>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {user.isAuth &&
        <div className="comment col-7 d-flex flex-column mb-4 p-4">
          <Form className="d-flex flex-wrap" onSubmit={onCreateComment}>
            <div className="input-group">
              <Form.Control as="textarea" rows={5} className="form-control comment__input-textarea"
                            placeholder="Место для вашего комментария..."
                            aria-label="search" value={newComment} onChange={e => setNewComment(e.target.value)}
              />
              <button type="submit" id="" className="default-btn default-btn_pale-pink btn__border_pale-pink fw-bold">
                Отправить
              </button>
            </div>
          </Form>
        </div>
      }
    </div>
  )
}

export default ProductPage;