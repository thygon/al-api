import React, { Component } from 'react';
import {AppService as app} from './../../../services/AppService';
import Search from './../../../components/forminputs/Search';


class All extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        	articles:[],
        	filters:'all'
        }
        this.filterbtns = this.filterbtns.bind(this); 
        this.handleSearch = this.handleSearch.bind(this);
        this.filtered = this.filtered.bind(this);
        this.deletePost = this.deletePost.bind(this); 
        this.goToEdit = this.goToEdit.bind(this);
        this.goToRead = this.goToRead.bind(this);
    }

    componentDidMount() {
    	app.get('articles').then(
            success =>{
            	console.log(success);
            	this.setState({
            		articles:success.data
            	})
            },
            err =>{
            	console.log(err);
            }
    		)
    }

    filtered(){
     let filters = this.state.filters;
     let articles = this.state.articles;

     let filteredarticles = articles.filter((article)=>{
         switch(filters){
            case 'unpublished':
               let unpublished = article.isPublished; 
               return unpublished === 0;
            case 'published':
               let published = article.isPublished; 
               return published === 1;
            case 'all':
               return article;
            default:
            let title = article.title;
            let content = article.content;
               return title.toLowerCase().search(filters) !== -1 ||
                      content.toLowerCase().search(filters) !== -1  ;
          }
     })
     return filteredarticles;
    }

    filterbtns(what){
    	this.setState({
    		filters:what.toLowerCase()
    	})
    }

    handleSearch(e){
    	let s = e.target.value
    	this.setState({
    		filters:s.toLowerCase()
    	})
    }

    goToEdit(id){
       const {history } = this.props;
       history.push(`/articles/edit/${id}`);
    }

    goToRead(id){
       const {history } = this.props;
       history.push(`/articles/article/${id}`);
    }

    deletePost(id){
        var y = confirm('Sure to Delete!');
        if(y){
           app.delete('article/delete',id).then(
            success =>{console.log(success)

                if(success.data.success){
                   let articles = this.state.articles;
                   let newarticles = articles.filter((a) =>{
                          return a.id !== id
                       }
                    )
                   this.setState({articles:newarticles})
                }
            },
            error =>{console.log(error)}
            )
        }
     }

    render() {
    	
    	let articles = this.filtered();
    	const displayArticles = (
    	     articles.map((article) =>(
    	     	 <div className='col-md-4' key={article.id}>
	    	     	 <div className='panel'>
	    	     	   <div className='panel-body'>
	    	     	     <div onClick={()=>this.goToRead(article.id)}>
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
    	     	))
    		)
        return (<div className="card">
			      <div className="content">
	               <div className='row'>
	                   <div className='col-12'>
	                     <div className="btn-group btn-group-sm">
					        <button type="button" className="btn btn-default"
					          onClick={()=>this.filterbtns('all')}>ALL</button>
					        <button type="button" className="btn btn-default"
					          onClick={()=>this.filterbtns('Published')}>Published</button>
					        <button type="button" className="btn btn-default"
					         onClick={()=>this.filterbtns('Unpublished')}>Unpublished</button>
					      </div>
		                  <div className="btn-group btn-group-sm pull-right">
		                     <Search onSubmit={this.handleSearch}/>
		                  </div>
	                   </div>
	                   <div className='col-12'>
	                      <div className='row'>{(articles.length <= 0)?
	                         <p>No posts</p> : displayArticles}</div>
	                   </div>
	                </div>
	               </div>
	              </div>
	                );
    }
}

export default All;



