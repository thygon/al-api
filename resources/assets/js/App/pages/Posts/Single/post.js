import React, { Component } from 'react';
import {AppService as app} from './../../../services/AppService';
import EditForm from './edit';

class Post extends Component {
    

    constructor(props) {
        super(props);
        this.state ={
        	featured:'',
        	post:[]
        }

        this.editting = this.editting.bind(this);
        this.delete = this.delete.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.myImage = this.myImage.bind(this);
    }

    componentDidMount() {
    	const {match} = this.props;
    	let id = match.params.id;
    	app.get('post',id).then(
    		success =>{
    			console.log(success);
    			let res = success.data;
    			if(res){
    				this.setState({
    					post:res
    				})
    			}
    		},
    		error =>{
    			console.log(error);
    		} 
    		)
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
				this.setState({post:success.data.post,edit:false})
			},
			err =>{console.log(err)} 
			)
    }

   myImage(file){
       this.setState({
       	featured:file
       })
   }

    editting(){
    	let id = this.state.post.id;
    	const {history } = this.props;
        history.push(`/posts/edit/${id}`);
    }

    delete(id){
    	const {history} = this.props;
        var y = confirm('Sure to Delete!');
        if(y){
           app.delete('post/delete',id).then(
            success =>{console.log(success)

                if(success.data.success){
                    history.push('/posts/all');
                }
            },
            error =>{console.log(error)}
            )
        }
     }

    render() {
    	const post = this.state.post;
    	const edit = this.state.edit;
        const url = `${app.path+'/uploads/'+post.url}`;
    	const readpost = (
    		  <div className='panel'>
    		    <div className='panel-heading'>
	    		    <div className="btn-group pull-right">
				        <button onClick={()=>this.editting()} type="button" className="btn btn-primary">edit</button>
				        <button onClick={()=>this.delete(post.id)} type="button" className="btn btn-danger">delete</button>
				      </div>
    		    </div>
    		    
    		    <div className='panel-body'>
	    		    <h3>{post.title}</h3>
	    		    <img className='img-responsive' src={url}/>
	    		    <p>{post.content}</p>
    		    </div>
    		  </div>
    		)

    	const renderpost = (
            (post.length <= 0)? <p>Loading...</p>:<div>{readpost}</div>
    		) 

        return (<div>{renderpost}</div>);
    }
}

export default Post;
