import React, { Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import renderField from './../../../components/FormInputs/renderField';

class ArticleForm extends Component {
    

    constructor(props) {
        super(props);
    }

    componentDidMount() {
		this.props.initialize({
			publish:false
		})
	}

    render() {

    	const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit} className='form' >
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
			       <button type='submit' className='btn btn-primary'>Create Article</button>
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
	 }else if(values.content.length > 255){
        errors.content = 'Too Long Content';
	 }

	  return errors;
}

export default reduxForm({
	form: 'newarticleform',
	validate
})(ArticleForm);
