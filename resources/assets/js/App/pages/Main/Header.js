import React from 'react';
import { connect } from 'react-redux';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import Logout from './../auth/logout';
import {logout} from '../../reducers/Auth';
import Notifications from './Notifications';


const Header = ({
  showMobileMenu,
  toggleMobileNavVisibility,
  isAuthenticated,
  dispatch,
  history
}) => (
    <Navbar fluid={true}>
      <Navbar.Header>
        <button type="button" className="navbar-toggle" data-toggle="collapse" onClick={toggleMobileNavVisibility}>
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </Navbar.Header>

      <Navbar.Collapse>
        <div className="separator"></div>
        <Navbar.Form pullLeft>
          <FormGroup>
            <span className="input-group-addon"><i className="fa fa-search"></i></span>
            <FormControl type="text" placeholder="Type to search" />
          </FormGroup>
        </Navbar.Form>
        <Nav pullRight>
          <Notifications/>
          <NavItem>{isAuthenticated && <Logout onLogoutClick={() => dispatch(logout())}/>}</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

const mapStateToProp = state => ({
  isAuthenticated: state.Auth.logged
}); 

const mapDispatchToProp = dispatch => ({
  dispatch,
  toggleMobileNavVisibility: () => dispatch(toggleMobileNavVisibility())
});


export default connect(mapStateToProp, mapDispatchToProp)(Header);