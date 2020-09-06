import React from 'react';
import { VerticalNav } from '../nav/vertical-nav';

export function SideBar() {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light">
      <div className="sidebar-sticky">
        <VerticalNav />
      </div>
    </nav>
  );
}
