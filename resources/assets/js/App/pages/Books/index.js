
import React from 'react';
import { Route } from 'react-router-dom';
import All from './All';
import CreateBook from './New';


const Books = ({match})=>(

	<div className="content">
    <div className="container-fluid">
      <Route path={`${match.url}/all`} component={All} />
      <Route path={`${match.url}/new`} component={CreateBook} />
    </div>
  </div>

);

export default Books;
