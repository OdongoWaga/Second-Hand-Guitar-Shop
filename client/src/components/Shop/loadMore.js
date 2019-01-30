import React from 'react';
import CardBlockShop from '../ui/cardBlockShop';

const LoadMore = ({ grid, propducts, loadMore, size, limit }) => {
  return (
    <div>
      <div className="">
        <CardBlockShop grid={grid} propducts={propducts} />
      </div>

      {size && size >= limit ? (
        <div className="load_more_container">
          <span onClick={loadMore}>Load More</span>
        </div>
      ) : null}
    </div>
  );
};

export default LoadMore;
