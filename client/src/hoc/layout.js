import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSiteData } from '../actions/site';

import Header from '../components/Header/';
import Footer from '../components/Footer/';

class Layout extends Component {
  componentDidMount = () => {
    if (!!Object.keys(this.props.site)) {
      this.props.getSiteData();
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer data={this.props.site} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site,
  };
};

const mapDispatchToProps = {
  getSiteData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
