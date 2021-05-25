import React from 'react';

function Nav({handleLogout}) {
  return (
    <div className='nav-bar'>
      <h1>Plus Two</h1>
      <div className="button logout" onClick={handleLogout}>Logout</div>
    </div>
  );
}

export default Nav;