import axios from "axios";
import React, { useState, useEffect } from "react";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const { data } = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const commentsToRender = comments.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ));
  console.log(comments);
  return <ul>{commentsToRender}</ul>;
};

export default Comments;
