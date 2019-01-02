import React , { Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import renderField from './../../components/FormInputs/renderField';
import { connect } from 'react-redux';

const  validate = (values) =>{
	const errors = {};
	if (!values.title) {
	    errors.title = 'Title is required';
	 }

	 if (!values.content) {
	    errors.content = 'Post Content is required';
	 }else if(values.content.length > 255){
        errors.content = `Max of 255 characters, provided ${values.content.length}`;
	 }

	  return errors;
}

class EditForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			image:'',
			post :this.props.post
	    };
	    this.getFile = this.getFile.bind(this);  
	}
	componentDidMount() {
		this.props.initialize({
			title:this.state.post.title,
			content:this.state.post.content,
			publish:this.state.post.isPublished
		})
	}


	getFile(file){
		//do prop action
		this.props.onFileLoaded(file);
	}

	render(){
		const post = this.state.post;
		const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit} className='form' >
            <h3>Update post</h3>
              <div className='form-group'>
                 <Field type='text' name='title' className='form-control' component='input'/>
              </div>

              <div className='form-group'>
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
			       <button type='submit' className='btn btn-primary'>Update Post</button>
			    </div>

            </form>
        );
	}
}

let Form = reduxForm({
	form: 'updatepostform',
	validate
})(EditForm);

const mapStateToProp = state => ({
  initialValues :{

  }
}); 

export default connect(mapStateToProp,null)(Form);