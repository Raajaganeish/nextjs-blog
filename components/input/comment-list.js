import classes from "./comment-list.module.css";

function CommentList({ comments, deleteComment }) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((eachComment, index) => (
        <li key={eachComment.id} onClick={(e) => deleteComment(eachComment.id)}>
          <p>{eachComment.text}</p> @ <strong> {eachComment.timeStamp}</strong>
          <div>
            By <address>{eachComment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
