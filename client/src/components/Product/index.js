import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import PageTop from '../ui/pageTop';
import { getProductDetail, getProductClear } from '../../actions/products';
import { addToCart } from '../../actions/user';

import ProdInfo from './prodInfo';
import ProdImg from './prodImg';

class Product extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.getProductDetail(id).then(response => {
      if (!this.props.products.prodDetail) {
        this.props.history.push('/');
      }
    });
  };

  componentWillUnmount() {
    this.props.getProductClear();
  }

  addToCartHandler = id => {
    this.props.addToCart(id);
  };

  render() {
    const { products } = this.props;
    return (
      <div>
        <PageTop title="Product detail" />

        <div className="container">
          {products.prodDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: '500px' }}>
                  <ProdImg detail={products.prodDetail} />
                </div>
              </div>
              <div className="right">
                <ProdInfo
                  detail={products.prodDetail}
                  addToCart={id => this.addToCartHandler(id)}
                />
              </div>
            </div>
          ) : (
            <div
              div
              className="main_loader"
              style={{ textAlign: 'center', paddingTop: '60px' }}
            >
              <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = {
  getProductDetail,
  getProductClear,
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
