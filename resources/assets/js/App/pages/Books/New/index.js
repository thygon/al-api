import React, {Component} from 'react';
import BookForm from './BookForm';
import {AppService as app} from './../../../services/AppService';


export default class CreateBook extends Component{

	constructor(props){
		super(props);
		this.state ={
			book:''
		}
		this.newBook = this.newBook.bind(this);
		this.getBookFile = this.getBookFile.bind(this);
	}

	newBook(values){
		const {history} = this.props; 
	  const data = new FormData();
	  data.append('title',values.title);
	  data.append('description',values.desc);
	  data.append('book',this.state.book,this.state.book.name);

      app.post('book/new',data).then(
      	 success =>{console.log('Success',success)
      	 if(success.data.success){
      	 	history.push('/books/all');
      	 }
      	 
      	},
      	 error =>{console.log('Error',error)}
      	);
	}

	getBookFile(book){
		this.setState({book});
	}


	render(){
		return(
			<div>
				<div className="card">
			      <div className="header">
				      <h4>New Book</h4>
				  </div>
			      <div className="content">
			        <BookForm handleFile={this.getBookFile} onSubmit={this.newBook}/>
			      </div>
			    </div>
			</div>);
	}
}