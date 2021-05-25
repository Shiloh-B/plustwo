import React from 'react';
import Nav from './nav';

function Main({handleLogout}) {
  return (
    <div>
      <Nav handleLogout={handleLogout} />
    </div>
  );
}

export default Main;