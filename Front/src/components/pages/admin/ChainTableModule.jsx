import React, {useContext, useEffect, useState} from "react";
import "./AdminPage.css";

import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {createChain, fetchCategories, fetchChains} from "../../api/ProductAPI";
import {Form} from "react-bootstrap";

const ChainTableModule = observer(() => {
  const {chainStorage} = useContext(Context);
  const {categoryStorage} = useContext(Context);

  const [chainCategory, setChainCategory] = useState('');
  const [chainSymptoms, setChainSymptoms] = useState('');

  let categoryArr = [];

  useEffect(() => {
    fetchChains().then(data => {
      chainStorage.setChains(data["chain"]);
    })
    fetchCategories().then(data => {
      categoryStorage.setCategories(data["category"])
    })
  }, [])

  function setCategoryArr(categoryId, chainId, chainSymptom) {
    let chainMap = {
      symptoms: chainSymptom,
      category: Number(categoryId),
      id: chainId
    };

    categoryArr.push(chainMap);
  }

  const onSetChainSubmit = e => {
    e.preventDefault();
    let chainMap = {
      symptoms: chainSymptoms,
      category: Number(chainCategory),
    };
    categoryArr.push(chainMap);
    setChain();
    setChainCategory('');
    setChainSymptoms('');
  }

  function setChain() {
    createChain(categoryArr);

    alert("Рекомендация создана.");
    // navigate(0);
  }

  return (
    <>
      <Form className="product d-flex flex-column p-3 mb-4" onSubmit={onSetChainSubmit}>
        <div className="d-flex justify-content-between align-items-center p-1 pb-3">
          <h5 className="fw-bold">Создание рекомендации</h5>
        </div>

        <div className="d-flex">
          <Form.Control className="modal__input me-4" placeholder="Укажите симптомы..."
                        value={chainSymptoms} onChange={e => setChainSymptoms(e.target.value)}
          />

          <select defaultValue={'DEFAULT'} className="form-select me-4 py-0"
                  onChange={e => setChainCategory(e.target.value)}
          >
            <option value="DEFAULT" disabled>Выберите категории...</option>
            {categoryStorage.categories.map((category, index) =>
              <option key={index} value={category.id}>{category.id}. {category.name}</option>
            )}
          </select>
          <button type="submit" className="btn btn-secondary">Создать</button>
        </div>
      </Form>

      <div className="product d-flex flex-column px-2 pb-2 mb-4">
        <h5 className="fw-bold px-2 py-3">Таблица пользователей</h5>
        <table className="table table-sm table__border text-center align-middle">
          <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Симптомы</th>
            <th scope="col">Категория медикаментов</th>
          </tr>
          </thead>
          <tbody>
          {chainStorage.chains.map((chain, index) =>
            <tr key={index}>
              <th scope="row">{chain.pk}</th>
              <td>{chain.symptoms}</td>
              <td>
                <select defaultValue={'DEFAULT'} className="form-select py-0"
                        onChange={(e) => {
                          e.preventDefault();
                          setCategoryArr(e.target.value, chain.pk, chain.symptoms);
                        }}>
                  <option value="DEFAULT" disabled>Выберите категории...</option>
                  <option value={0}>Удалить запрос</option>
                  {categoryStorage.categories.map((category, index) =>
                    <option key={index} value={category.id}>{category.id}. {category.name}</option>
                  )}
                </select>
              </td>
            </tr>
          )}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button type="button" onClick={setChain} className="btn btn-secondary">Создать</button>
        </div>
      </div>
    </>
  );
});

export default ChainTableModule;