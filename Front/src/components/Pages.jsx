import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
  const {ProductStore} = useContext(Context)
  const pageCount = Math.ceil(ProductStore.totalCount / ProductStore.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <Pagination className="mt-3">
      {pages.map(page =>
        <Pagination.Item
          key={page}
          active={ProductStore.page === page}
          onClick={() => ProductStore.setPage(page)}
        >
          {page}
        </Pagination.Item>
      )}
    </Pagination>
  );
});

export default Pages;