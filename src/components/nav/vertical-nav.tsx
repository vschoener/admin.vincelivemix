import React, { ReactElement } from 'react';
import Link from 'next/link';

export function VerticalNav(): ReactElement {
  return (
    <nav className="nav flex-column">
      <Link href="/test">
        <a className="nav-link active">Test</a>
      </Link>
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
