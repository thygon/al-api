import React from 'react';

const Logout = (props) =>{


	const { onLogoutClick} = props
	
	return(<a href="#" onClick={() => onLogoutClick()}>Logout</a>)
}

export default Logout;