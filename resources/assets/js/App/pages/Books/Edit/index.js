import React,{Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import renderField from './../../../components/FormInputs/renderField';
import {AppService as app} from './../../../services/AppService';


class EditBook extends Component{

	constructor(props) {
		super(props);
		this.state ={
           book:{},
           pdf:null
		}
		this.captureFile = this.captureFile.bind(this);
	}


	componentDidMount() {
		const {match} = this.props;
    	let id = match.params.id;

        app.get('book',id).then(success =>{
        	let book = success.data;

        	this.setState({book});
        	this.props.initialize({
					title:this.state.book.title,
					desc:this.state.book.description
				})
        })
	}

	captureFile(e){
		this.setState({
			pdf:e
		})
	}


	updateBook(values){

		const {history} = this.props;

       const data = new FormData();
       data.append('title',values.title);
	  data.append('description',values.desc);
	  data.append('_method','PUT');
	  if(this.state.pdf){
	  	data.append('book',this.state.pdf,this.state.pdf.name);
	  }
	  

	  app.put('book/update',data,this.state.book.id).then(success=>{
	  	console.log(success);
	  	if(success.data.success){
	  		history.push('/books/all');
	  	}
	  })
	}

	render(){
		const { book } = this.state.book;
		const {handleSubmit} = this.props;

		return(<div>
			<h1>Edit Book</h1>
			<form onSubmit={handleSubmit(this.updateBook.bind(this))} className='form' encType='multipart/form-data' >
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
			       <button type='submit' className='btn btn-primary'>Update Book</button>
			    </div>
            </form></div>);
	}

}


const validate = (values) =>{
	const errors = {};
    if(!values.title){
        errors.title ='Field is required'
    }

    if(!values.desc){
        errors.desc ='Field is required'
    }else if(values.desc.length > 300){
    	errors.desc = 'Too long text, 300 characters allowed!' 
    }
    
    
    return errors;
}

export default reduxForm({
	form: 'editbookform',
	validate
})(EditBook);