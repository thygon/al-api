
import React from 'react';
import { Route } from 'react-router-dom';
import All from './All';
import CreateArticle from './New';
import Article from './One/article';
import Edit from './one/edit';


const Articles = ({match})=>(

	<div className="content">
    <div className="container-fluid">
      <Route path={`${match.url}/all`} component={All} />
      <Route path={`${match.url}/new`} component={CreateArticle} />
      <Route path={`${match.url}/article/:id`} component={Article} />
      <Route path={`${match.url}/edit/:id`} component={Edit} />
    </div>
  </div>

);

export default Articles;
