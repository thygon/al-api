import decode from 'jwt-decode';

export const store =(key,value)=>{
   localStorage.setItem(key,value);
}

export const get = (key) =>{
	return localStorage.getItem(key);
}

export const remove =(key) =>{
	localStorage.removeItem(key);
} 

export const user =() =>{
        return JSON.parse(get('user'));
}

function isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return false;
            }
            else
                return true;
        }
        catch (err) {
            return false;
        }
       
    }

function check(){
        let token = get('authtoken'); 
        return isTokenExpired(token) 
}

export function Authenticate(){
  return check();
}
export function authHeader(){
    let token = get('authtoken');
    if(token !== undefined){
        return {'Authorization':'Bearer '+token}
    }else{
        return {}
    } 
}