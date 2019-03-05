import React, {Component} from 'react';
import {AppService as app} from './../../../services/AppService';
import { Link } from 'react-router-dom';
 
export default class All extends Component {
     
 
     constructor(props) {
         super(props);
         this.state ={
         	posts:[]
         }
         this.filterPosts =this.filterPosts.bind(this); 
         this.deletePost = this.deletePost.bind(this);
         this.readPost = this.readPost.bind(this);
         this.editPost = this.editPost.bind(this);
     }

     componentDidMount() {
     	
     	app.get('posts').then(
     		success =>{
     			let posts = success.data;
     			this.setState({
                    posts
     			})
     		},
     		error =>{ console.log(error)}
     		)
     }

     filterPosts(what){
       let filterposts = this.state.posts;
       let posts = filterposts.filter((post)=>{
          switch(what){
            case 'unpublished':
               let unpublished = post.isPublished; 
               return unpublished === 0;
            case 'published':
               let published = post.isPublished; 
               return published === 1;
            case 'all':
               return post;
            default:
            let title = post.title;
               return title.toLowerCase().search(what.toLowerCase()) !== -1;
          }
       })
       return posts;
     }

     deletePost(id){
        var y = confirm('Sure to Delete!');
        if(y){
           app.delete('post/delete',id).then(
            success =>{console.log(success)

                if(success.data.success){
                   let posts = this.state.posts;
                   let newposts = posts.filter((post) =>{
                          return post.id !== id
                       }
                    )
                   this.setState({posts:newposts})
                }
            },
            error =>{console.log(error)}
            )
        }
     }

     readPost(id){
        const {history } = this.props;
        history.push(`/posts/post/${id}`);
     }

     editPost(id){
        const {history } = this.props;
        history.push(`/posts/edit/${id}`);
     }

     trunStr(str,num ){
       if (str.length > num) {
         return str.slice(0, num) + "...";}
       else {
        return str;}
    }

     render() {
        const {filter} = this.props;
        let posts = this.filterPosts(filter.toLowerCase());

        const list = (
              posts.map((post) =>
                        <div key={post.id} className="col-sm-6 col-md-4">
                            <div className="thumbnail">
                              <img onClick={() => this.readPost(post.id)} className='img-responsive' src={app.path+'/uploads/'+post.url}
                               alt="..."/>
                              <div className="caption">
                                <h3>{post.title}</h3>
                                <p onClick={() => this.readPost(post.id)}>{this.trunStr(post.content, 100)}</p>
                                <p>
                                <div className="btn-group">
                                    <button onClick={()=>this.editPost(post.id)} type="button" className="btn btn-secondary">
                                       <span className="btn-label">
                                              <i className="fa fa-edit"></i>
                                            </span> Edit
                                    </button>
                                    <button onClick={()=>this.deletePost(post.id)} type="button" className="btn btn-danger">
                                        <span className="btn-label">
                                          <i className="fa fa-times"></i>
                                        </span> Delete
                                    </button>
                                </div>
                                
                                </p>
                              </div>
                            </div>
                          </div>
                    )
            )

        const renderposts = (
              (posts.length <= 0)?<h1>No Posts</h1>:
                                  <div className='row'>
                                  <br/>
                                       {list}
                                  </div> 
            );
     	
        return (<div>
        	         {renderposts}
         	    </div>);
        
     }
 }