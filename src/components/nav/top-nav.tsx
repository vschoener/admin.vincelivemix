import React, { ReactElement } from 'react';

export function TopNav(): ReactElement {
  return (
    <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-3 mr-0" href="#">
        Vince Live Mix Admin
      </a>

      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="#">
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  );
}
