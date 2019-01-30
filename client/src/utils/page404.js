import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';

const Page404 = () => {
  return (
    <div className="container">
      <div className="not_found_container">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <div>Oops ! Page not found.</div>
      </div>
    </div>
  );
};

export default Page404;
