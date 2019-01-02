import React from 'react';
import { Route as R ,Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { AuthenticateUser } from '../../reducers/Auth';
import { withRouter } from 'react-router-dom';

//private routes
import {PrivateRoute as Route, PublicRoute as OpenRoute } from '../../components/PrivateRoute';

import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
import ThemeOptions from '../../components/ThemeOptions';
import MobileMenu from '../../components/MobileMenu';

/**
 * Pages
 */
import Dashboard from '../Dashboard';
import Components from '../Components';
import UserProfile from '../UserProfile';
import MapsPage from '../MapsPage';
import Forms from '../Forms';
import Charts from '../Charts';
import Calendar from '../Calendar';
import Tables from '../Tables';

///pages
import Posts from '../Posts';
import Articles from '../Articles';
import Books from '../Books';
import Newsletter from '../NewsLetter';
import Users from '../Users';
import UserAuth from '../Auth';

import NotificationSystem from 'react-notification-system';
import {onReset} from './../../reducers/Notification';


const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history,
  isAuth,
  green,
  content,
  red,
  dispatch
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  if(green || red){
      setTimeout(()=>{
        dispatch(onReset());
      },5000)
  }
  

  if(green){
    this.notificationSystem.addNotification({
      message:content ,
      level: 'success',
      autoDismiss: 0,
      position:'tc'
    });
  }

  if(red){
    this.notificationSystem.addNotification({
      message:content ,
      level: 'error',
      autoDismiss: 0,
      position:'tc'
    });
  }

  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
      <div className="wrapper">
        <NotificationSystem ref={ref => this.notificationSystem = ref}/>
        <div className="close-layer" onClick={hideMobileMenu}></div>
        {isAuth && <SideBar />}
        <div className="main-panel">
            <Header history={history}/>
            <Route exact path="/" component={Dashboard} />
            <Route path="/components" component={Components} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/forms" component={Forms} />
            <Route path="/tables" component={Tables} />
            <Route path="/maps" component={MapsPage} />
            <Route path="/charts" component={Charts} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/posts" component={Posts} />
            <Route path="/articles" component={Articles} />
            <Route path="/books" component={Books} />
            <Route path="/newsletter" component={Newsletter} />
            <Route path="/users" component={Users} />
            <Footer />
        </div>
        <OpenRoute path="/auth" component={UserAuth} />
      </div>
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility,
  isAuth: state.Auth.logged,
  green:state.Notification.green,
  red:state.Notification.red,
  content:state.Notification.content
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));