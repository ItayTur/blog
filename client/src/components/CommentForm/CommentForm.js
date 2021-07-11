import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      { content }
    );
    console.log(data);
    setContent("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>New comment</label>
        <input
          className="form-control"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CommentForm;
