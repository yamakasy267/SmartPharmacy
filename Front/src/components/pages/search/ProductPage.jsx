import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {createComment, fetchFavorites, fetchMedicine} from "../../api/ProductAPI";
import {Context} from "../../../index";
import {Form, Spinner} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const ProductPage = () => {
  const {user} = useContext(Context)
  const [product, setProduct] = useState([])
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  function getMedicine(id) {
    fetchMedicine(id).then((data) => {
      setProduct(data["med"][0]);
      setComments(data["med"][0].comments);
    });
  }

  useEffect(() => {
    setLoading(true)
    getMedicine(id)
    setLoading(false)
  }, []);

  function commentsCheck(comments) {
    if (comments.length > 0) {
      return comments[0].user !== null && comments[0].text !== null;
    }
    return false
  }

  function trimWhitespaces (str) {
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

  if (loading) {
    return (
      <Container className="d-flex flex-fill justify-content-center align-items-center">
        <Spinner animation={"grow"}/>
      </Container>
    )
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="product col-8 d-flex flex-column px-4 pt-4 mb-3">
        <div className="d-flex justify-content-end">
          <h4 className="product__info_stat">
            <i className="bi bi-heart"></i>
          </h4>
        </div>
        <div className="d-flex px-5">
          <div className="col align-self-center text-center">
            <img src="/assets/2.jpg" className="img-fluid w-50" alt="Фото товара"/>
          </div>
          <div className="col ps-5 align-self-center">
            {/*<h5 className="pb-1">Название</h5>*/}
            <h5 className="pb-1">{product.name}</h5>
            {/*<h6 className="pb-2">Производитель</h6>*/}
            <h6 className="pb-2">{product.producer}</h6>
            <div className="product__info">
              <div
                className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                <h5>Aктивное в-во</h5>
                {/*<h6 className="">Aктивное в-во</h6>*/}
                <h6 className="">{product.category__name}</h6>
              </div>
              <div
                className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                <h5>Форма</h5>
                <h6 className="">таблетки</h6>
              </div>
              <div
                className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                <h5>Количество</h5>
                {/*<h6 className="">10 шт, по 500 мг</h6>*/}
                <h6 className="">{product.quantity} шт, по 500 мг</h6>
              </div>
            </div>
          </div>
        </div>
        <h5 className="product__info_stat px-5 py-3">
          <i className="bi bi-eye"></i>
          &nbsp;300{/*&nbsp;{props.favorite}*/}
        </h5>
      </div>

      {
        commentsCheck(comments) ?
          comments.map((comment, index) =>
            <Comment key={index} comment={comment}/>
          )
          :
          <div className="comment col-7 d-flex flex-column mt-2 p-4">
            <div className="comment__info">
              У этого товара ещё нет комментариев...
            </div>
          </div>
      }

      {/*<div className="col-7 d-flex mt-2">*/}
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
      {/*        Impressive! Though it seems the drag feature could*/}
      {/*        be improved. But overall it looks incredible. You’ve*/}
      {/*        nailed the design and the responsiveness at various*/}
      {/*        breakpoints works really well.*/}
      {/*      </h6>*/}
      {/*    </div>*/}
      {/*    <div className="d-flex align-self-end">*/}
      {/*      <button type="button" className="d-flex default-btn default-btn_rich-green">*/}
      {/*        <i className="bi bi-trash-fill">&ensp;</i>*/}
      {/*        <h6 className="fw-bold">Удалить</h6>*/}
      {/*      </button>*/}
      {/*      &emsp;&emsp;*/}
      {/*      <button type="button" className="d-flex default-btn default-btn_pale-pink">*/}
      {/*        <i className="bi bi-pencil-fill">&ensp;</i>*/}
      {/*        <h6 className="fw-bold">Изменить</h6>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {user.isAuth &&
        <div className="comment col-7 d-flex flex-column mt-2 mb-5 p-4">
          <Form className="d-flex flex-wrap mb-4" onSubmit={onCreateComment}>
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

const Comment = ({comment}) => {
  const {user} = useContext(Context)
  return (
    <div className="comment col-7 d-flex flex-column mt-2 p-4">
      <div className="comment__info px-5 pb-2">
        <div className="d-flex pb-4">
          <h6 className="fw-bold">{comment.user}</h6>
          &emsp;&emsp;&emsp;
          <h6>месяц назад</h6>
        </div>
        <h6>{comment.text}</h6>
      </div>
      {/*{user.isAuth &&*/}
      {/*  <div className="d-flex align-self-end">*/}
      {/*    <button type="button" className="d-flex default-btn default-btn_rich-green">*/}
      {/*      <i className="bi bi-arrow-90deg-left">&ensp;</i>*/}
      {/*      <h6 className="fw-bold">Ответить</h6>*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*}*/}
    </div>
  )
}

export default ProductPage;