import React, { ReactElement } from 'react';
import Link from 'next/link';

import { useAuth } from '../../providers/auth.provider';

export function TopNav(): ReactElement {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-3 mr-0" href="#">
        Vince Live Mix Admin
      </a>

      <ul className="navbar-nav px-3">
        {user && (
          <li className="nav-item text-nowrap">
            {/* Do not use api path directly and create logout page? */}
            <Link href="/api/logout">
              <a className="nav-link">Sign out</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
