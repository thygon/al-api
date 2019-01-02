
import {AppService as app} from './../services/AppService';
import {store,get,remove, Authenticate,user} from './../helpers';
import {onSuccess,onError} from './Notification';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const RESET_REQUEST = 'RESET_REQUEST'
export const RESET_FAILURE = 'RESET_FAILURE'
export const RESET_SUCCESS = 'RESET_SUCCESS'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    logged: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    logged: true,
    user:user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    logged: false,
    message
  }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    logged: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    logged: false
  }
}

function requestReset(creds){
  return {
    type: RESET_REQUEST,
    reset:false,
    creds
  }
}

function resetError(message){
  return {
    type:RESET_FAILURE,
    reset:false,
    message
  }
}

function receiveReset(){
  return{
    type:RESET_SUCCESS,
    reset:true
  }
}


export default function reducer(state = {
  user: user() || {name:'No User'},
  logged:Authenticate(),
  forgotpass:true

}, action) {

 switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        logged: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        logged: true,
        errorMessage: '',
        user:action.user
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        logged: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        logged: false
      })
    case RESET_REQUEST:
      return Object.assign({}, state, {
        reset: false,
        user: action.creds
      })
    case RESET_FAILURE:
      return Object.assign({}, state, {
        reset: false,
        errorMessage: action.message
      })

    case RESET_SUCCESS:
    return Object.assign({},state,{
      reset:true
    })

    default:
      return state
  }
}


export function login(creds){
	return dispatch =>{
		dispatch(requestLogin(creds));

		return app.post('login',creds).then(
			(success)=>{ 

				if(success.status == 200){
          let data = success.data;
					let error = data;
					dispatch(loginError(error));

          if(data.success === false){
            dispatch(loginError({'invalid':error.message}));
          }

					if(data.success){
            //if admin
            let isAdmin = data.user.isAdmin;
            if(isAdmin === 1){
              //store user and token
              store('authtoken',data.token);
              store('user',JSON.stringify(data.user));
              dispatch(receiveLogin(data.user));
              dispatch(onSuccess(data.message));
            }else{
              dispatch(loginError({'invalid':'You are not an Admin!'}));
            }
						
					}

				}
				
			},
			error =>{
			      let e =  error.response;
                 if(e.status === 401 ){
                  let err = {'invalid':e.data.message};
                 	dispatch(loginError(err));
                 }else{
                    let err = {'invalid':error.message};
                    dispatch(loginError(err));
                 }
			     
		    }
			).catch(error =>console.log('catch Error ',error) );
	} 
}

export function logout() {

  return dispatch => {
    dispatch(requestLogout())

    return app.post('logout',{}).then(
    	success =>{
    		let res = success.data;

    		if(res.success){
    			remove('user')
			    remove('authtoken')
			    dispatch(receiveLogout())
          dispatch(onSuccess('You are Logged Out!'))
    		}else{
    			remove('user')
			    remove('authtoken')
			    dispatch(receiveLogout())
          dispatch(onSuccess('You are Logged Out!'))
    		}
    	},
    	error =>{console.log(error)
    		    remove('user')
			      remove('authtoken')
			      dispatch(receiveLogout());
            dispatch(onSuccess('You are Logged Out!'))
    	}

    	)
    
  }
}


export function reset(creds){
  return dispatch =>{
    dispatch(requestReset(creds));
    app.post('recover',creds).then(
      success =>{
        let res = success.data;
        if(res.success){
          dispatch(receiveReset())
        }else{
          dispatch(resetError(res));
        }
      },
      error =>{
        let err = error.response

        dispatch(resetError(err.data.message))
      }
      );
  }
}