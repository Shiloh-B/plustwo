import React from 'react';

function Nav({handleLogout}) {
  return (
    <div className='nav-bar'>
      <div>

      </div>
      <div>
        <h1>Plus <span>Two</span></h1>
      </div>
      <div className="grid-column">
        <div className="button logout" onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
}

export default Nav;