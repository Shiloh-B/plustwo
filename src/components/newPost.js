import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newPost } from '../actions/index';
import fire from '../fire';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.jokeRef = React.createRef();
    this.state = {
      joke: ''
    }

   this.jokeHandler = this.jokeHandler.bind(this);
   this.handleNewPost = this.handleNewPost.bind(this);
  }
  render() {
    return (
      <div className="new-post-container">
        <p>Got Something to Say?</p>
        <div className="joke-container">
          <input ref={this.jokeRef} className="joke-input" type="text" onChange={this.jokeHandler}></input>
          <div className="post button" onClick={this.handleNewPost}>Post</div>
        </div>
      </div>
    );
  }

  jokeHandler(e) {
    this.setState({joke: e.target.value});
  }

  handleNewPost() {
    this.props.newPost(this.state.joke);
    this.setState({joke: ''});
    this.jokeRef.current.value = '';
  }
}

export default connect(null, {newPost})(NewPost);