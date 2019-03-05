import React, { Component } from 'react';
import {MenuItem,NavDropdown } from 'react-bootstrap';

import {AppService as app} from './../../services/AppService';



class Notifications extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
        	alerts:[]
        }
    }

    componentDidMount() {
    	app.get('notifies').then((response)=>{
    		let alerts = response.data;

		  this.setState({
            alerts
		  })
		});
    }

    render() {

    	const {alerts} = this.state;
    	let count = alerts.length;

    	
        return (
                <NavDropdown title="Alerts" id="right-nav-bar">
                  { alerts.map((alert)=>
                      <MenuItem key={alert.id} href="#">
                       {(alert.data).map((d)=> <h3 key={1}>{d.name}</h3>)}
                      </MenuItem>
                    )}
                </NavDropdown>
        	
        );
    }
}

export default Notifications;
