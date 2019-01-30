import React from 'react';
import FontAwersomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

import { Button } from '../ui/button';

const ProdInfo = ({ detail, addToCart }) => {
  const showProdTags = detail => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <FontAwersomeIcon icon={faTruck} />
          <div className="tag_text">
            <div>Free shipping</div>
            <div>And return</div>
          </div>
        </div>
      ) : null}

      {detail.available ? (
        <div className="tag">
          <FontAwersomeIcon icon={faCheck} />
          <div className="tag_text">
            <div>Available</div>
            <div>in store</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <FontAwersomeIcon icon={faTimes} />
          <div className="tag_text">
            <div>Not Available</div>
            <div>Preorder only</div>
          </div>
        </div>
      )}
    </div>
  );

  const showProdActions = detail => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <Button type="addToCartLink" runAction={() => addToCart(detail._id)} />
      </div>
    </div>
  );

  const showProdSpec = detail => (
    <div className="product_specifications">
      <h2>Specifications:</h2>
      <div className="item">
        <strong>Frets:</strong> {detail.frets}
      </div>
      <div className="item">
        <strong>Wood:</strong> {detail.wood.name}
      </div>
    </div>
  );

  const { name, description, brand } = detail;
  return (
    <div>
      <h1>
        {brand.name} {name}
      </h1>
      <p>{description}</p>
      {showProdTags(detail)}
      {showProdActions(detail)}
      {showProdSpec(detail)}
    </div>
  );
};

export default ProdInfo;
