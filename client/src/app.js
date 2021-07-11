import React from "react";
import PostForm from "./components/PostForm/PostForm";
import Posts from "./components/Posts/Posts";

const App = () => {
  return (
    <div className="container">
      <h1>Blog App</h1>
      <PostForm />
      <hr />
      <h2>Posts</h2>
      <Posts />
    </div>
  );
};

export default App;
