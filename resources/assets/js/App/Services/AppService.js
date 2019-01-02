import axios from 'axios';
import {get} from './../helpers';

export const AppService = {
	path:"http://127.0.0.1:8000",
	api:"http://127.0.0.1:8000/api/app/",
	header(){
       return {
       	'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '+get('authtoken')
       }
	},

	get(url,id = null){

		if(id === null){
			return axios.get(this.api+url,{headers:this.header()});

		}else{

			return axios.get(this.api+url+'/'+id);

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