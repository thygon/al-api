import axios from 'axios';
import {get} from './../helpers';
const ur ='http://127.0.0.1:8000';

export const AppService = {
	//app.alhashmiapp.com
	//127.0.0.1:8000
	path:ur,
	api: ur +'/api/app/',

	header(){
       return {
       	'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '+get('authtoken'),
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept"
       }
	},

	get(url,id = null){

		if(id === null){
			return axios.get(this.api+url,{headers:this.header()});

		}else{

			return axios.get(this.api+url+'/'+id,{headers:this.header()});

		}
	},

	post(url,data){

      return axios.post(this.api+url,data,{headers:this.header()});

	},
	put(url, data, id){

		return axios.post(this.api+url+'/'+id,data,{headers:this.header()});

	},
	delete(url,id){
       return axios.post(this.api+url+'/'+id,{'_method':'delete'},{headers:this.header()});
	}

};