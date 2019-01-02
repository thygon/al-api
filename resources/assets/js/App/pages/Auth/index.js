import React from 'react';
import { Route } from 'react-router-dom';
import Login from './login';
import Reset from './reset';
import './styles.scss';

const UserAuth = ({match}) => {
    return (
       <div className='auth-page'>
           <Route exact path={`${match.url}`} component={Login} />
           <Route exact path={`${match.url}/reset`} component={Reset} />
       </div>
    );
};



export default UserAuth;
