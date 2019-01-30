import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/user.js';
import { Button } from './button';

const NOT_IMAGE = '/images/image_not_availble.png';

class Card extends Component {
  renderCardImage = images => {
    if (images.length) {
      return images[0].url;
    }

    return NOT_IMAGE;
  };
  render() {
    const {
      grid,
      images,
      brand,
      name,
      price,
      _id,
      description,
      user,
    } = this.props;
    return (
      <div className={`card_item_wrapper ${grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(images)}) no-repeat`,
          }}
        />
        <div className="action_container">
          <div className="tags">
            <div className="brand">{brand.name}</div>
            <div className="name">{name}</div>
            <div className="price">${price}</div>
          </div>

          {grid ? (
            <div className="description">
              <p>{description}</p>
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrapp">
              <Button
                type="default"
                altClass="card_link"
                title="View propduct"
                linkTo={`/product/${_id}`}
              />
            </div>
            <div className="button_wrapp">
              <Button
                type="bag_link"
                runAction={() => {
                  user.userData
                    ? this.props.addToCart(_id)
                    : console.log('need log in');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
