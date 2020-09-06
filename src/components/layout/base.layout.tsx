import React, { FunctionComponent } from 'react';

import { SideBar } from '../sidebar/sidebar';
import { TopNav } from '../nav/top-nav';

export const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <TopNav />
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
