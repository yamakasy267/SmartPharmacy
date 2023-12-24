import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

// import {fetchOneDevice} from "../http/deviceAPI";

const ProductPage = () => {
    const [product, setDevice] = useState({info: []})
    const {id} = useParams()
    // useEffect(() => {
    //     fetchOneDevice(id).then(data => setDevice(data))
    // }, [])

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
                        <h5 className="pb-1">Название</h5>
                        <h6 className="pb-2">Производитель</h6>
                        <div className="product__info">
                            <div
                                className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                                <h5>Aктивное в-во</h5>
                                <h6 className="">Aктивное в-во</h6>
                            </div>
                            <div
                                className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                                <h5>Форма</h5>
                                <h6 className="">таблетки</h6>
                            </div>
                            <div
                                className="product__info_border d-flex justify-content-between align-items-center pt-2 pb-1">
                                <h5>Количество</h5>
                                <h6 className="">10 шт, по 500 мг</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <h5 className="product__info_stat px-5 py-3">
                    <i className="bi bi-eye"></i>
                    &nbsp;300{/*&nbsp;{props.favorite}*/}
                </h5>
            </div>

            <div className="comment col-7 d-flex flex-column mt-2 p-4">
                <div className="comment__info px-5 pb-2">
                    <div className="d-flex pb-4">
                        <h6 className="fw-bold">amyrobson</h6>
                        &emsp;&emsp;&emsp;
                        <h6>месяц назад</h6>
                    </div>
                    <h6>Impressive! Though it seems the drag feature could
                        be improved. But overall it looks incredible. You’ve
                        nailed the design and the responsiveness at various
                        breakpoints works really well.
                    </h6>
                </div>
                <div className="d-flex align-self-end">
                    <button type="button" className="d-flex default-btn default-btn_rich-green">
                        <i className="bi bi-arrow-90deg-left">&ensp;</i>
                        <h6 className="fw-bold">Ответить</h6>
                    </button>
                </div>
            </div>

            <div className="col-7 d-flex mt-2">
                <div className="comment__nesting-line d-flex flex-fill mx-4"></div>
                <div className="comment d-flex flex-column p-4">
                    <div className="comment__info pb-2">
                        <div className="d-flex justify-content-between pb-4">
                            <div className="d-flex align-items-center px-5">
                                <h6 className="fw-bold">ramsesmiron</h6>
                                &emsp;&emsp;&emsp;
                                <h6>месяц назад</h6>
                            </div>
                            <div>
                                <h6 className="comment__affiliation py-1 px-4">Вы</h6>
                            </div>
                        </div>
                        <h6 className="px-5">
                            <span>@amyrobson&ensp;</span>
                            Impressive! Though it seems the drag feature could
                            be improved. But overall it looks incredible. You’ve
                            nailed the design and the responsiveness at various
                            breakpoints works really well.
                        </h6>
                    </div>
                    <div className="d-flex align-self-end">
                        <button type="button" className="d-flex default-btn default-btn_rich-green">
                            <i className="bi bi-trash-fill">&ensp;</i>
                            <h6 className="fw-bold">Удалить</h6>
                        </button>
                        &emsp;&emsp;
                        <button type="button" className="d-flex default-btn default-btn_pale-pink">
                            <i className="bi bi-pencil-fill">&ensp;</i>
                            <h6 className="fw-bold">Изменить</h6>
                        </button>
                    </div>
                </div>
            </div>

            <div className="comment col-7 d-flex flex-column mt-2 mb-5 p-4">
                <div className="input-group">
                    <textarea className="form-control comment__input-textarea" rows="5"
                              placeholder="Место для вашего комментария..."></textarea>
                    <button type="button" id="input-group-button-right"
                            className="default-btn default-btn_pale-pink btn__border_pale-pink fw-bold">
                        Отправить
                    </button>
                </div>
            </div>

            {/*<div className="h-100 col-3 align-items-center pb-4">*/}
            {/*    <div className="px-4">*/}
            {/*        <img src="/assets/1.jpg" className="img-fluid" alt="Фото товара"/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="d-flex justify-content-end pt-4">*/}
            {/*    <h4 class    Name="product__info_stat">*/}
            {/*        <i className="bi bi-heart"></i>*/}
            {/*    </h4>*/}
            {/*</div>*/}

            {/*<h4>Название</h4>/!*<h4>{props.title}</h4> *!/*/}
            {/*<div className="product__vendor pb-2">*/}
            {/*    <h6>Производитель</h6>/!*<h6>{props.vendor}</h6>*!/*/}
            {/*</div>*/}
            {/*<div className="product__info">*/}
            {/*    <div className="product__info_border d-flex justify-content-between align-items-end">*/}
            {/*        <h5>Aктивное в-во</h5>*/}
            {/*        <h6 className="text-end">Aктивное в-во</h6>/!*<h6 className="text-end">{props.substance}</h6>*!/*/}
            {/*    </div>*/}
            {/*    <div className="product__info_border d-flex justify-content-between align-items-end">*/}
            {/*        <h5>Форма</h5>*/}
            {/*        <h6 className="text-end">таблетки</h6>/!*<h6 className="text-end">{props.form}</h6>*!/*/}
            {/*    </div>*/}
            {/*    <div className="product__info_border d-flex justify-content-between align-items-end">*/}
            {/*        <h5>Количество</h5>*/}
            {/*        <h6 className="text-end">10 шт, по 500*/}
            {/*            мг</h6>/!*<h6 className="text-end">{props.quantity} шт, по {props.weight} мг</h6>*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="product__info_stat d-flex align-items-end justify-content-between py-3">*/}
            {/*    <h5>*/}
            {/*        <i className="bi bi-eye"></i>*/}
            {/*        &nbsp;300/!*&nbsp;{props.favorite}*!/*/}
            {/*    </h5>*/}
            {/*    <h4 className="fw-bold">*/}
            {/*        500 &#x20bd;/!*{props.price} &#x20bd;*!/*/}
            {/*    </h4>*/}
            {/*</div>*/}
        </div>
    );
};

export default ProductPage;