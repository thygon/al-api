import React,{Component} from 'react';
import {login} from '../../reducers/Auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LoginForm extends Component{
	constructor(props){
		super(props);
	}

	render(){

		const {errorMessage, isAuthenticated} = this.props;
		let hasError = (field) =>{
		   	 return  errorMessage && !! errorMessage[field];
		   }

		let renderError = (field ) =>{


		   	if(hasError(field)){
		   		if(typeof errorMessage === Array ){
		   			return(
		   			<span>
		   			    <strong>{errorMessage[field][0]}</strong>
		   			</span>
		   			);
		   		}else{
		   			return(
		   			<span>
		   			    <strong>{errorMessage[field]}</strong>
		   			</span>
		   			);
		   		}
		   		
		   	}
		   }
		return(
		<div className='login-form'>
		    <h2>Login</h2>
		    <h4>admin</h4>
		    <div className='form'>
		        {renderError('invalid')}
			    <input type='email' 
			           ref='email' 
			           className={hasError('email') && 'form-control error' || 'form-control'}  
			           placeholder='Email Address'/>
			    {renderError('email')}
			    <input type='password' 
			           ref='password' 
			           className={hasError('password') && 'form-control error' || 'form-control'}
			           placeholder='Password'/>
			    {renderError('password')}
			    <button onClick={(event) => this.handleClick(event)} className="btn btn-block bg-primary">
			          Login
			    </button>
			    
		    </div>
		    <div>
		       forgot Password! <Link to='/auth/reset'>Reset</Link>
		    </div>
		</div>);
	}

	handleClick(event){
	    const email = this.refs.email
	    const password = this.refs.password
	    const creds = { email: email.value.trim(), password: password.value.trim() }
	    this.props.onLoginClick(creds);
	  }
}


const Login  = ({dispatch,errorMessage}) =>{


	return(<div className='auth-content'>
			   <LoginForm errorMessage={errorMessage} onLoginClick={(creds) =>dispatch(login(creds))}/> 
		   </div>)
}

const mapStateToProp = state => ({
  isAuthenticated: state.Auth.logged,
  errorMessage:state.Auth.errorMessage
}); 

const mapDispatchToProp = dispatch => ({
  dispatch
});

export default connect(mapStateToProp, mapDispatchToProp)(Login);

