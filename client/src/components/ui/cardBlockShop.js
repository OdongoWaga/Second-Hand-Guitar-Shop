import React from 'react';
import Card from '../ui/card';

const CardBlockShop = ({ grid, propducts }) => {
  const renderCards = propducts =>
    propducts.map(item => <Card key={item._id} {...item} grid={grid} />);
  return (
    <div className="card_block_shop">
      <div>
        <div>
          {propducts && propducts.length ? (
            renderCards(propducts)
          ) : (
            <div className="no_result">Sorry,no results</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardBlockShop;
