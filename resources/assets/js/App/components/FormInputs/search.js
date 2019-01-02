import React, { Component} from 'react';

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
        	value:''
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
    	this.setState({value:e.target.value})
        this.props.onSubmit(e);
    }

    render() {
    	const { onSubmit } = this.props;
        return (
            <form onSubmit={onSubmit} role="search">
			  <div className="form-group">
			    <input type="text" onChange={this.onChange} className="form-control" placeholder="Search by title"/>
			  </div>
			</form>
        );
    }
}

export default Search;
