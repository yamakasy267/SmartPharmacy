import React, {useContext} from 'react';
import {Context} from "../index";
import ReactPaginate from "react-paginate";

const PaginationModule = () => {
  const {productStorage} = useContext(Context)
  const pageCount = Math.ceil(productStorage.totalCount / productStorage.limit)

  // const pages = []
  // for (let i = 0; i < pageCount; i++) {
  //   pages.push(i + 1)
  // }
  //
  // return (
  //   <Pagination className="mt-3">
  //     {pages.map(page =>
  //       <Pagination.Item
  //         key={page}
  //         active={productStorage.page === page}
  //         onClick={() => productStorage.setPage(page)}
  //       >
  //         {page}
  //       </Pagination.Item>
  //     )}
  //   </Pagination>
  // );

  const handlePageClick = (event) => {
    productStorage.setPage(event.selected)
  };

  return (
    <ReactPaginate
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      nextLabel="Вперёд >"
      previousLabel="< Назад"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  );
}

export default PaginationModule;