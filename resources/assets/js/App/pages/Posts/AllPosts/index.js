import React,{Component} from 'react';
import All from './all';
import Search from './../../../components/forminputs/Search';

export default class AllPosts extends Component {
    

    constructor(props) {
        super(props);
        this.state ={
        	filters:'all'
        } 
        this.filterbtns = this.filterbtns.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    filterbtns(what){
    	this.setState({
    		filters:what
    	})
    }

    handleSearch(e){
        e.preventDefault();
        let search = e.target.value;
        
        this.setState({
            filters:search
        })
    }

    render() {
        const {history} = this.props; 
        return (
        	<div>
		    <div className="card">
		      <div className="content">
		         <div className="btn-group">
			        <button type="button" className="btn btn-default"
			          onClick={()=>this.filterbtns('all')}>ALL</button>
			        <button type="button" className="btn btn-default"
			          onClick={()=>this.filterbtns('Published')}>Published</button>
			        <button type="button" className="btn btn-default"
			         onClick={()=>this.filterbtns('Unpublished')}>Unpublished</button>
			      </div>
                  <div className="btn-group pull-right">
                     <Search onSubmit={this.handleSearch}/>
                  </div>
		        <All history={history} filter={this.state.filters}/>
		      </div>
		    </div>
		 </div>
        );
    }
}
