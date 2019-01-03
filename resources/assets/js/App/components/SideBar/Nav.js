import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {
  
  constructor(props){
    super(props);
    this.state ={}
  }
  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/">
            <i className="pe-7s-graph"></i>
            <p>Dashboard</p>
          </Link>
        </li>

        <li className={this.isPathActive('/posts') || this.state.postMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ postMenuOpen: !this.state.postMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-note2"></i>
            <p>Posts<b className="caret"></b></p>
          </a>
          <Collapse in={this.state.postMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/posts/all') ? 'active' : null}>
                  <Link to="/posts/all">All Posts</Link>
                </li>
                <li className={this.isPathActive('/posts/new') ? 'active' : null}>
                  <Link to="/posts/new">New Post</Link>
                </li>
                
              </ul>
            </div>
          </Collapse>
        </li>

        <li className={this.isPathActive('/articles') || this.state.articleMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ articleMenuOpen: !this.state.articleMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-note2"></i>
            <p>Articles<b className="caret"></b></p>
          </a>
          <Collapse in={this.state.articleMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/articles/all') ? 'active' : null}>
                  <Link to="/articles/all">All Articles</Link>
                </li>
                <li className={this.isPathActive('/articles/new') ? 'active' : null}>
                  <Link to="/articles/new">New Article</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li className={this.isPathActive('/books') || this.state.bookMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ bookMenuOpen: !this.state.bookMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-note2"></i>
            <p>Books<b className="caret"></b></p>
          </a>
          <Collapse in={this.state.bookMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/books/all') ? 'active' : null}>
                  <Link to="/books/all">All Books</Link>
                </li>
                <li className={this.isPathActive('/books/new') ? 'active' : null}>
                  <Link to="/books/new">New Book</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li className={this.isPathActive('/newsletter') ? 'active' : null}>
          <Link to="/newsletter">
            <i className="pe-7s-graph"></i>
            <p>Messaging</p>
          </Link>
        </li>


        <li className={this.isPathActive('/users') ? 'active' : null}>
          <Link to="/users">
            <i className="pe-7s-graph"></i>
            <p>Users</p>
          </Link>
        </li>


      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);