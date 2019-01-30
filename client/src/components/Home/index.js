import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from './slider';
import Promotion from './promotion';
import CardBlock from '../ui/cardBlock';

import {
  getProductsByArrival,
  getProductsBySell,
} from '../../actions/products';

class Home extends Component {
  componentDidMount() {
    this.props.getProductsBySell();
    this.props.getProductsByArrival();
  }
  render() {
    const { products } = this.props;
    return (
      <div>
        <Slider />
        <CardBlock list={products.byShell} title="Best Selling guitars" />
        <Promotion />
        <CardBlock list={products.byArrival} title="New arrivals" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

const mapDispatchToProps = {
  getProductsBySell,
  getProductsByArrival,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
