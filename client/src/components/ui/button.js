import React from 'react';
import FontAwersomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

import { Link } from 'react-router-dom';

export const Button = ({
  type,
  title,
  linkTo,
  addStyles,
  altClass,
  runAction,
}) => {
  const getButton = () => {
    let template = '';

    switch (type) {
      case 'default':
        template = (
          <Link
            className={altClass ? altClass : 'link_default'}
            to={linkTo}
            style={addStyles}
          >
            {title}
          </Link>
        );
        break;
      case 'bag_link':
        template = (
          <div className="bag_link" onClick={() => runAction()}>
            <FontAwersomeIcon icon={faShoppingBag} />
          </div>
        );
        break;

      case 'addToCartLink':
        template = (
          <div className="add_to_cart_link" onClick={() => runAction()}>
            <FontAwersomeIcon icon={faShoppingBag} />
            Add to cart
          </div>
        );
        break;
      default:
        template = '';
    }

    return template;
  };

  return <div className="my_link">{getButton()}</div>;
};
