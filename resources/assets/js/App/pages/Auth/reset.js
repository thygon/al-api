import React, { Component } from 'react';
import { connect } from 'react-redux';
import {reset} from '../../reducers/Auth';

class Reset extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {

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
        return (
        	<div className='auth-content'>
	        	<div className='reset-form'>
		        	<h2>Reset Password</h2>
			        <h4>admin</h4>
	                <div className='from'>
	                   <input type='email' 
			           ref='email' 
			           className={hasError('email') && 'form-control error' || 'form-control'}  
			           placeholder='Email Address'/>
			           {renderError('email')}

			           <button onClick={(event) => this.handleClick(event)} className="btn btn-block bg-primary">
					          Reset
					   </button>
	                </div>
	        	</div>
        	</div>
        );
    }

    handleClick(event){
	    const email = this.refs.email
	    const creds = { email: email.value.trim()}
	    this.props.dispatch(reset(creds));
	  }
}

const mapStateToProp = state => ({
  errorMessage:state.Auth.errorMessage
}); 

const mapDispatchToProp = dispatch => ({
  dispatch
});

export default connect(mapStateToProp, mapDispatchToProp)(Reset);

