import React, { Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import renderField from './../../../components/FormInputs/renderField';
import {AppService as app} from './../../../services/AppService';

class Edit extends Component {
    

    constructor(props) {
        super(props);
        this.state ={
        	article:[]
        }
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
    			this.props.initialize({
					publish:this.state.article.isPublished,
					title:this.state.article.title,
					content:this.state.article.content
				})
    		}
    		);

	}

	updateArticle(values){
      const errors = {};
      const {history} = this.props; 

      const data = new FormData();
	  data.append('title',values.title);
	  data.append('content',values.content);
	  data.append('publish',values.publish);
      data.append('_method','PUT');
      app.put('article/update',data,this.state.article.id).then(
      	 success =>{console.log('Success',success)
      	   if(success.data.success){
      	   	history.push(`/articles/article/${this.state.article.id}`);
      	   }
      	},
      	 error =>{console.log('Error',error)}
      	);
	}

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.updateArticle.bind(this))} className='form' >
               <div className="form-group">
			        <label className="control-label col-md-3">Title</label>
			        <Field
			              className='form-control'
			              name="title"
			              type="text"
			              component={renderField} />
			    </div>

			    <div className="form-group">
			        <label className="control-label col-md-3">Content</label>
			        <Field
			            className='form-control'
			            name='content'
                        type='textarea'
                        rows='6'
                        placeholder='Article content..'
                        component={renderField}
                         	/>
			    </div>

			    <div className="form-group">
				    <Field
				          name="publish"
				          type="checkbox"
				          component={renderField}
				          label="Publish Post" />
			    </div>

			    <div className="form-group">
			       <button type='submit' className='btn btn-primary'>Update Article</button>
			    </div>
            </form>
        );
    }
}


const  validate = (values) =>{
	const errors = {};
	if (!values.title) {
	    errors.title = 'Title is required';
	 }

	 if (!values.content) {
	    errors.content = 'Article Content is required';
	 }else if(values.content.length > 2000){
        errors.content = 'Too Long Content';
	 }

	  return errors;
}

export default reduxForm({
	form: 'updatearticleform',
	validate
})(Edit);
