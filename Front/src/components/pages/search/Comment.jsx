import React, {useContext, useState} from "react";
import {Context} from "../../../index";
import {deleteComment} from "../../api/ProductAPI";

const Comment = ({comment}) => {
  const {user} = useContext(Context)
  const [isExist, setExistence] = useState(true)

  function removeComment(id) {
    try {
      let data = deleteComment(id);
      setExistence(false)
    } catch (e) {
      alert(e);
    }
  }

  function getDateTime(comment_date) {
    let date = new Date(comment_date);
    let day = [
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
      date.getFullYear()
    ].join('/');
    let hours = [
      String(date.getHours()).padStart(2, '0'),
      String(date.getMinutes()).padStart(2, '0')
    ].join(':');
    return [day, hours].join(" ");
  }

  if (!isExist) {
    return
  }

  return (
    <div className="comment d-flex flex-column mt-2 p-4">
      <div className="comment__info px-5 pb-2">
        <div className="d-flex justify-content-between pb-4">
          <div className="d-flex align-items-center">
            <h6 className="fw-bold pe-4">@{comment.user}</h6>
            <h6>{getDateTime(comment.date)}</h6>
          </div>
          {
            comment.user === user.name_ &&
            <h6 className="comment__affiliation py-1 px-4">Вы</h6>
          }
        </div>
        <h6>{comment.text}</h6>
      </div>
      {
        (comment.user_id === user.id || user.isAdmin) &&
        <div className="d-flex align-self-end px-5">
          <button type="button" className="d-flex default-btn default-btn_rich-green"
                  onClick={e => removeComment(comment.id_com)}>
            <i className="bi bi-trash-fill">&ensp;</i>
            <h6 className="fw-bold">Удалить</h6>
          </button>
        </div>
      }
    </div>
  )
}

export default Comment;

