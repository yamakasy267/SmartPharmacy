import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const PaginationModule = observer(() => {
  const {productStore} = useContext(Context)
  const pageCount = Math.ceil(productStore.totalCount / productStore.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <Pagination className="mt-3">
      {pages.map(page =>
        <Pagination.Item
          key={page}
          active={productStore.page === page}
          onClick={() => productStore.setPage(page)}
        >
          {page}
        </Pagination.Item>
      )}
    </Pagination>
  );
});

export default PaginationModule;