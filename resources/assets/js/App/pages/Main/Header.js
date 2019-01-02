import React from 'react';
import { connect } from 'react-redux';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import Logout from './../auth/logout';
import {logout} from '../../reducers/Auth';

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
          <NavDropdown title={<i className="fa fa-globe" />} id="basic-nav-dropdown">
            <MenuItem>Action</MenuItem>
            <MenuItem>Another action</MenuItem>
            <MenuItem>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem>Separated link</MenuItem>
          </NavDropdown>
          <NavDropdown title="Notifications" id="right-nav-bar">
            <MenuItem>Action</MenuItem>
            <MenuItem>Another action</MenuItem>
            <MenuItem>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem>Separated link</MenuItem>
          </NavDropdown>
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