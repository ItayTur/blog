import React from "react";

const Comments = ({ comments }) => {
  const commentsToRender = comments.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ));
  console.log(comments);
  return <ul>{commentsToRender}</ul>;
};

export default Comments;
