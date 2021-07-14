import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "../CommentForm/CommentForm";
import Comments from "../Comments/Comments";

const Posts = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const { data } = await axios.get("http://localhost:4002/posts");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const postsToRender = Object.values(posts).map((post) => (
    <div
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
      key={post.id}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <Comments comments={post.comments} />
        <CommentForm postId={post.id} />
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {postsToRender}
    </div>
  );
};

export default Posts;
