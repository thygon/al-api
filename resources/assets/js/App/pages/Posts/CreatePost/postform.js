import React , { Component} from 'react';
import { Field, reduxForm,actions} from 'redux-form';
import renderField from './../../../components/FormInputs/renderField';
//import './file.scss';


const  validate = (values) =>{
	const errors = {};
	if (!values.title) {
	    errors.title = 'Title is required';
	 }

	 if (!values.content) {
	    errors.content = 'Post Content is required';
	 }else if(values.content.length > 255){
        errors.content = 'Too Long Content';
	 }

	  return errors;
}


class PostForm extends Component{

	constructor(props){
		super(props);
		this.state = {image:''};
        this.getFile = this.getFile.bind(this);
	}

	getFile(file){
		this.props.onFileLoaded(file);
	}

	componentDidMount() {
		this.props.initialize({
			publish:false
		})
	}


	render(){
		const {handleSubmit} = this.props;

        return (
            <form  onSubmit={handleSubmit} className='form' >
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
			        <label className="control-label col-md-3">Featured Image</label>
			        <Field
			            className='form-control'
			            name='image'
                        type='file'
                        accept='image'
                        file={this.getFile}
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
			       <button type='submit' className='btn btn-primary'>Create Post</button>
			    </div>
            </form>
        );
	}
}

export default reduxForm({
	form: 'newpostform',
	validate
})(PostForm);