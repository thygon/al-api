import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';
import Logout from './../../pages/auth/logout';
import {logout} from './../../reducers/Auth';

class UserInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
        isShowingUserMenu: false
      };
  }
  

  render() {
    let { user,isAuth, dispatch } = this.props;
    let { isShowingUserMenu } = this.state;
    return (
      <div className="user-wrapper">
        <div className="user">
          <img src={'https://randomuser.me/api/portraits/lego/7.jpg'} alt={user.name} className="photo" />
          <div className="userinfo">
            <div className="username">
              {user.name}
            </div>
            <div className="title">{user.email}</div>
          </div>
          <span
            onClick={() => this.setState({ isShowingUserMenu: !this.state.isShowingUserMenu })}
            className={cx("pe-7s-angle-down collapse-arrow", {
              active: isShowingUserMenu
            })}></span>
        </div>
        <Collapse in={isShowingUserMenu}>
          <ul className="nav user-nav">
            <li><a href="#">My Profile</a></li>
            <li><a href="#">Edit Profile</a></li>
            <li><a href="#">Settings</a></li>
            <li>{isAuth && <Logout onLogoutClick={() => dispatch(logout())}/>}</li>
          </ul>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.Auth.user,
  isAuth: state.Auth.logged
});
const mapDispatchToProp = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProp)(UserInfo);