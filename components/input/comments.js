import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import axios from "axios";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const { showNotification } = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function deleteComment(id) {
    const response = await axios.post(`/api/comments/${eventId}`, {
      id,
      type: "DELETE",
    });
    if (response.data) {
      updateComments();
    }
  }

  function updateComments() {
    axios.get(`/api/comments/${eventId}`).then((res) => {
      const {
        data: { commentsList = [] },
      } = res;
      if (commentsList) {
        setCommentList(commentsList);
      } else {
        console.log("CommentsList is Empty");
      }
    });
  }

  function addCommentHandler(commentData) {
    // send data to API
    console.log("Invoking API to post comment");
    showNotification({
      show: true,
      title: "Waiting",
      message: "Registering",
      status: "pending",
    });
    axios
      .post(`/api/comments/${eventId}`, commentData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        showNotification({
          show: true,
          title: "Success!",
          message: res.data.message,
          status: "success",
        });
      });
    setTimeout(() => {
      updateComments();
    }, 1200);
  }

  useEffect(() => {
    if (showComments && commentList.length === 0) {
      updateComments();
    }
  }, [showComments]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && (
        <CommentList comments={commentList} deleteComment={deleteComment} />
      )}
    </section>
  );
}

export default Comments;
