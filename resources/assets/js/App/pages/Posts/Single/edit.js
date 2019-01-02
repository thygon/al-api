import React, { Component } from 'react';
import {AppService as app} from './../../../services/AppService';
import EditForm from './../edit';

class Edit extends Component {
  

    constructor(props) {
        super(props);
        const {match} = this.props;
        this.state ={
        	id:match.params.id,
        	featured:'',
        	post:[]
        }
        this.myImage = this.myImage.bind(this); 
        this.updatePost = this.updatePost.bind(this); 
    }

    componentDidMount() {
    	let id = this.state.id;
    	app.get('post',id).then(
    		success =>{
    			let post = success.data;
    			this.setState({
    				post
    			})
    		}
    		);

    }

    updatePost(values) {
		const data = new FormData();
		data.append('_method','PUT');
		data.append('title',values.title);
		data.append('content',values.content);
		data.append('publish',values.publish);
		data.append('image',this.state.featured,this.state.featured.name);

		app.put('post/update',data,this.state.post.id).then(
			success =>{ console.log(success);
				const {history} = this.props;
				history.go(-1);
			},
			err =>{console.log(err)} 
			)
    }

    myImage(file){
       this.setState({
       	featured:file
       })
   }

    render() {
    	const {post}= this.state;

        return (<div>{(post.length <= 0)?<p>Loading...</p>:
        <EditForm onFileLoaded={this.myImage} onSubmit={this.updatePost} post={post}/>}</div>);
    }
}

export default Edit;
