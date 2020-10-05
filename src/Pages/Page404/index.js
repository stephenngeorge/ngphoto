import React from 'react';
import { useLocation } from 'react-router-dom';
import { Title } from '../../library';

const Page404 = () => {
  const { pathname } = useLocation();
  return (
    <div className="page site-page page-404">
      <div className="page-wrapper">
        <Title titleText="Page not found" titleLevel={ 1 } underlineColor="secondary" />
        <p>
          Sorry, we couldn't find anything to show for <span>{ pathname }</span>. This might 
          be our fault...or you may have entered something in the address bar that doesn't exist! 
          Check for typos or use the navigation.
        </p>
      </div>
    </div>
  );
}

export default Page404;