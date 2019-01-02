import React, { Component} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Alert from 'sweetalert-react';

export default class Info extends Component{
	constructor(props){
		super(props);
		this.state ={
			open:true
		} 
	}

	render(){

		const {title, message} = this.props; 
    	setTimeout(() => {
             this.setState({open: false});
           }, 2000);

    	return (
    		<div>
    		   <Alert
	                title={title || 'Alert'}
	                show={this.state.open}
	                text={message || 'server Info.'}
	                onConfirm={() => this.setState({ open: false })}
	            />
    		</div>
    		)

	}
}

