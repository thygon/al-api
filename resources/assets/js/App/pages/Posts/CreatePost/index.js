import React,{Component} from 'react';
import PostForm from './postform';
import {AppService as app} from './../../../services/AppService';

class NewPost extends  Component{
	constructor(props){
		super(props);
		this.createNewPost = this.createNewPost.bind(this);
		this.getFile = this.getFile.bind(this); 
		this.state = {
			image:''
		}
	}


	createNewPost(values){
		console.log(values)
		const {history} = this.props;
		const data = new FormData();
		data.append('title',values.title);
		data.append('content',values.content);
		data.append('publish',values.publish);
		data.append('image',this.state.image,this.state.image.name);

		app.post('post/new',data).then(
			success =>{ console.log(success);
				history.push('/posts/all');
			},
			err =>{console.log(err)} 
			)
	}

	getFile(file){
		this.setState({
			image:file
		})
	}


	render(){
		return(<div>
				<div className="card">
			      <div className="header">
				      <h4>New Post</h4>
				  </div>
			      <div className="content">
			       <PostForm onFileLoaded={this.getFile} onSubmit={this.createNewPost}/>
			      </div>
			    </div>
			</div>)
	}

	
}

export default NewPost;