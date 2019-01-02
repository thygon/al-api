import React, { Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import renderField from './../../../components/FormInputs/renderField';

class BookForm extends Component {
    

    constructor(props) {
        super(props);
        this.state ={
        	book:''
        }
        this.captureFile = this.captureFile.bind(this);
    }

    captureFile(e){
         this.props.handleFile(e);
    }

    render() {

    	const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit} className='form' encType='multipart/form-data' >
               <div className="form-group">
			        <label className="control-label col-md-3">Title</label>
			        <Field
			              className='form-control'
			              name="title"
			              type="text"
			              component={renderField} />
			    </div>

			    <div className="form-group">
			        <label className="control-label col-md-3">Description</label>
			        <Field
			            className='form-control'
			            name='desc'
                        type='textarea'
                        rows='6'
                        placeholder='Book synopsis'
                        component={renderField}
                         	/>
			    </div>
			    <div className="form-group">
			        <label className="control-label col-md-3">Upload Book</label>
			        <Field
			            className='form-control'
			            name='book'
                        type='file'
                        accept='document'
                        file={this.captureFile}
                        component={renderField}
                         	/>
			    </div>
			    <div className="form-group">
			       <button type='submit' className='btn btn-primary'>Create Book</button>
			    </div>
            </form>
        );
    }
}

const validate = (values) =>{
	const errors = {};
    if(!values.title){
        errors.title ='Field is required'
    }

    if(!values.desc){
        errors.desc ='Field is required'
    }
    
    return errors;
}

export default reduxForm({
	form: 'newbookform',
	validate
})(BookForm);
