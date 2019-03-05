
import React from 'react';
import { Route } from 'react-router-dom';
import All from './All';
import CreateBook from './New';
import EditBook from './Edit';


const Books = ({match})=>(

	<div className="content">
    <div className="container-fluid">
      <Route path={`${match.url}/all`} component={All} />
      <Route path={`${match.url}/new`} component={CreateBook} />
      <Route path={`${match.url}/edit/:id`} component={EditBook} />
    </div>
  </div>

);

export default Books;
