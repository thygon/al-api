

const SUCCESSFUL_REQUEST = 'SUCCESSFUL_REQUEST';
const ERRONIOUS_REQUEST = 'ERRONIOUS_REQUEST';
const NOTIFICATION_RESET = 'NOTIFICATION_RESET'

function successful(message){
	return{
		type:SUCCESSFUL_REQUEST,
		green:true,
		red:false,
		message
	}
}

function errorful(message){
	return{
		type:ERRONIOUS_REQUEST,
		green:false,
		red:true,
		message
	}
}

function reset(){
	return{
		type:NOTIFICATION_RESET,
		green:false,
		red:false,
		content:''
	}
}

export default function reducer(state = {
	green:false,
	red:false,
	content:''
},action){
	switch (action.type) {
    case SUCCESSFUL_REQUEST:
      return Object.assign({}, state, {
        green: true,
        red:false,
        content:action.message
      })
    case ERRONIOUS_REQUEST:
      return Object.assign({}, state, {
        red: true,
        green:false,
        content:action.message
      })
    case NOTIFICATION_RESET:
      return Object.assign({}, state, {
        red: false,
        green:false,
        content:''
      })

    default:
      return state
  }
}


export function onSuccess(message){
	return dispatch =>{
      dispatch(successful(message))
	}
}

export function onError(message){
	return dispatch =>{
		dispatch(errorful(message))
	}
}

export function onReset(){
	return dispatch =>{
		dispatch(reset())
	}
}