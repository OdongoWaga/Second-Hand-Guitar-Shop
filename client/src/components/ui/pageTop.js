import React from 'react';

const pageTop = props => {
  return (
    <div className="page_top">
      <div className="container">{props.title}</div>
    </div>
  );
};

export default pageTop;
