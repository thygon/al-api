import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import ThemeOptions from './ThemeOptions';
import Layout from './Layout';
import Auth from './Auth';
import Notification from './Notification';

export default {
  Auth,
  ThemeOptions,
  Layout,
  form: formReducer,
  Notification
};