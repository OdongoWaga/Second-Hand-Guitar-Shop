import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwersomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';
import {
  getProductsToShops,
  getBrands,
  getWoods,
} from '../../actions/products';
import LoadMore from './loadMore';
import Page from '../ui/pageTop';
import CollapseCheckbox from '../ui/CollapseCheckbox';
import CollapseRadio from '../ui/radio';
import { frets, price } from '../../utils/misc';

class Shop extends Component {
  state = {
    grid: false,
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: [],
    },
  };

  componentDidMount = () => {
    this.props.getBrands();
    this.props.getWoods();
    this.props.getProductsToShops(
      this.state.skip,
      this.state.limit,
      this.state.filters
    );
  };

  handlePrice = value => {
    const data = price;
    let arr = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        arr = data[key].array;
      }
    }

    return arr;
  };

  showFilteredResults = filters => {
    console.log(filters);

    this.props.getProductsToShops(0, this.state.limit, filters).then(() => {
      this.setState({
        skip: 0,
      });
    });
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValue = this.handlePrice(filters);
      newFilters[category] = priceValue;
    }

    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters,
    });
  };

  loadMoreCards = () => {
    const skip = this.state.skip + this.state.limit;
    this.props
      .getProductsToShops(
        skip,
        this.state.limit,
        this.state.filters,
        this.props.products.toShop
      )
      .then(() => {
        this.setState({
          skip,
        });
      });
  };

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid_bars' : '',
    });
  };

  render() {
    const { products } = this.props;
    return (
      <div>
        <Page title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, 'frets')}
              />
              <CollapseCheckbox
                initState={true}
                title="Woods"
                list={products.woods}
                handleFilters={filters => this.handleFilters(filters, 'wood')}
              />

              <CollapseRadio
                initState={true}
                list={price}
                title="Price"
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwersomeIcon icon={faTh} />
                  </div>

                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwersomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <LoadMore
                grid={this.state.grid}
                limit={this.state.limit}
                size={products.toShopSize}
                propducts={products.toShop}
                loadMore={() => {
                  this.loadMoreCards();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = {
  getBrands,
  getWoods,
  getProductsToShops,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
