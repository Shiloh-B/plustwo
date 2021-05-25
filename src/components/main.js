import React from 'react';
import Nav from './nav';
import NewPost from './newPost';
import Feed from './feed';

function Main({handleLogout}) {
  return (
    <div>
      <Nav handleLogout={handleLogout} />
      <NewPost />
      <Feed />
    </div>
  );
}

export default Main;