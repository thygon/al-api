import React, { Component } from 'react';
import {AppService as app} from './../../../services/AppService';

class All extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
        	books:[]
        }
        this.deleteBook = this.deleteBook.bind(this);
    }

    componentDidMount() {
    	app.get('books').then(
    		success =>{
    			console.log(success);
    			let books = success.data;
    			this.setState({
    				books
    			})
    		}
    		,err =>{
    			console.log(err)
    		}
    		)
    }

    trunStr(str,num ){
       if (str.length > num) {
         return str.slice(0, num) + "...";}
       else {
        return str;}
    }
    deleteBook(id){
    	var y = confirm('Sure to delete');
    	if(y){
            app.delete('book/delete',id).then(
    		success =>{
    			let books =this.state.books;
    			if(success.data.success){
    				let newbooks = books.filter((book) =>{
    					return book.id != id
    				})
    				this.setState({books:newbooks})
    			}
    		},
    		error =>{console.log(error)}
    		)
    	}
    }

    goToEdit(id){
         const {history } = this.props;
        history.push(`/books/edit/${id}`);
    }

    render() {
    	const books = this.state.books;
    	const display = (
    		  books.map((book)=>
			  	<tr key={book.id}>
			      <th scope="row">{book.id}</th>
			      <td>{book.title}</td>
			      <td><p>{this.trunStr(book.description,70)}</p></td>
			      <td>
			       <div className='btn-group-sm'>
			          <button type="button" className="btn btn-primary"
					    onClick={()=>this.goToEdit(book.id)}>
					      <i className="fa fa-edit"></i>
					  </button>
					  <button type="button" className="btn btn-danger"
					    onClick={()=>this.deleteBook(book.id)}>
					      <i className="fa fa-times"></i>
					  </button>
			       </div>
			      </td>
			    </tr>

			  )
    		) 
    	const table = (
    		<table className="table table-striped">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">Title</th>
			      <th scope="col">Description</th>
			      <th scope="col"></th>
			    </tr>
			  </thead>
			  <tbody>
			  		{display}	    
			  </tbody>
			</table>
    		)
        return (<div>{(books.length <= 0)?<p>No books</p>:table}</div>);
    }
}

export default All;
