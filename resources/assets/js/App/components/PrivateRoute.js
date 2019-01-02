import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { Authenticate} from './../helpers';
import { connect } from 'react-redux';


export const PrivateRoute = ({component:Component,...rest}) =>(
	 <Route {...rest} render={props =>( Authenticate()
	 	?<Component {...props}/>
	 	:<Redirect to={{ pathname:'/auth',state:{from:props.location}}}/>
	 	)} />
	);

 export const PublicRoute = ({component:Component,...rest}) =>(
	 <Route {...rest} render={props =>( !Authenticate()
	 	?<Component {...props}/>
	 	: <Redirect to={{ pathname:'/',state:{from:props.location}}}/>
	 	)} />
	);
