import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newPost } from '../actions/index';
import fire from '../fire';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.jokeRef = React.createRef();
    this.state = {
      joke: '',
      db: fire.firestore()
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

  async handleNewPost() {
    let jokeObj = {
      post: this.state.joke,
      score: 0,
      username: this.props.userData.username
    }
    this.props.newPost(jokeObj);
    let resData = await this.state.db.collection('posts').doc('user').get();
    resData = resData.data().posts;
    resData.push(jokeObj);
    this.state.db.collection('posts').doc('user').set({posts: resData});
    this.jokeRef.current.value = '';
  }

  
}

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps, { newPost })(NewPost);