import React, {Component} from 'react';
import ArticleForm from './ArticleForm';
import {AppService as app} from './../../../services/AppService';


export default class CreateArticle extends Component{

	constructor(props){
		super(props);
		this.newArticle = this.newArticle.bind(this);
	}

	newArticle(values){
      const errors = {};
      const {history} = this.props; 

      const data = new FormData();
	  data.append('title',values.title);
	  data.append('content',values.content);
	  data.append('publish',values.publish);

      app.post('article/new',data).then(
      	 success =>{console.log('Success',success)
      	   if(success.data.success){
      	   	history.push('/articles/all');
      	   }
      	},
      	 error =>{console.log('Error',error)}
      	);
	}


	render(){
		return(
			<div>
				<div className="card">
			      <div className="header">
				      <h4>New Article</h4>
				  </div>
			      <div className="content">
			        <ArticleForm onSubmit={this.newArticle}/>
			      </div>
			    </div>
			</div>);
	}
}