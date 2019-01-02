
import React from 'react';
import { Route } from 'react-router-dom';
import AllPosts from './AllPosts';
import NewPost from './CreatePost';
import Post from './single/post';
import Edit from './single/edit';

const Posts = ({match})=>(

	<div className="content">
    <div className="container-fluid">
      <Route path={`${match.url}/all`} component={AllPosts} />
      <Route path={`${match.url}/new`} component={NewPost} />
      <Route path={`${match.url}/post/:id`} component={Post} />
      <Route path={`${match.url}/edit/:id`} component={Edit} />
    </div>
  </div>

);

export default Posts;


