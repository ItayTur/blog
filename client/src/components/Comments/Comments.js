import React from "react";

const statusMessages = {
  approved: (content) => content,
  rejected: () => "this comment has been rejected",
  pending: () => "this comment is pending",
};

const Comments = ({ comments }) => {
  const commentsToRender = comments.map((comment) => {
    const content = statusMessages[comment.status](comment.content);
    return <li key={comment.id}>{content}</li>;
  });
  console.log(comments);
  return <ul>{commentsToRender}</ul>;
};

export default Comments;
