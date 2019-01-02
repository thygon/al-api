import React, { Component } from 'react';
import {AppService as app} from './../../../services/AppService';

class Article extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
        	article:[]
        }
        this.deletePost = this.deletePost.bind(this);
        this.goToEdit = this.goToEdit.bind(this);
    }
    componentDidMount() {
    	const {match} = this.props;
    	let id = match.params.id;
    	app.get('article',id).then(
    		success =>{
    			let article = success.data;
    			this.setState({
    				article
    			})
    		}
    		)
    }

    goToEdit(id){
       const {history } = this.props;
       history.push(`/articles/edit/${id}`);
    }

    deletePost(id){
    	const {history} = this.props; 
        var y = confirm('Sure to Delete!');
        if(y){
           app.delete('article/delete',id).then(
            success =>{console.log(success)

                if(success.data.success){
                   history.go(-1);
                }
            },
            error =>{console.log(error)}
            )
        }
     }

    render() {
    	const article = this.state.article;

    	const display = (
    		<div  key={article.id}>
	    	     	 <div className='panel'>
	    	     	   <div className='panel-body'>
	    	     	     <div>
                          	<h3>{article.title}</h3>
	    	     	      	{article.content}
	    	     	     </div>
	    	     	      
	    	     	     <p>
	    	     	       <div className='btn-group btn-group-xs'>
	    	     	         <button type="button" className="btn btn-secondary"
					          onClick={()=>this.goToEdit(article.id)}>
					            <i className="fa fa-edit"></i>
					          </button>
					          <button type="button" className="btn btn-danger"
					          onClick={()=>this.deletePost(article.id)}>
					            <i className="fa fa-times"></i>
					          </button>
	    	     	       </div>
	    	     	     </p>
	    	     	   </div>
	    	     	 </div>
    	     	 </div>
    		)
        return (<div>{(article.length <= 0)?<p>Loading..</p>:display}</div>);
    }
}

export default Article;
