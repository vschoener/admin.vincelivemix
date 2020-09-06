import React, { ReactElement } from 'react';

export function VerticalNav(): ReactElement {
  return (
    <nav className="nav flex-column">
      <a className="nav-link active" href="#">
        Active
      </a>
      <a className="nav-link" href="#">
        Link
      </a>
      <a className="nav-link" href="#">
        Link
      </a>
      <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">
        Disabled
      </a>
    </nav>
  );
}
