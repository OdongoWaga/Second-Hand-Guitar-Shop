import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logoutUser } from '../../actions/user';

class Header extends Component {
  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true,
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true,
      },
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false,
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false,
      },
      {
        name: 'Log in',
        linkTo: '/user/login',
        public: true,
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false,
      },
    ],
  };

  logoutHandler = () => {
    this.props.logoutUser().then(response => {
      if (response.payload.success) {
        this.props.history.push('/');
      }
    });
  };

  defaultLink = link =>
    link.name === 'Log out' ? (
      <div
        className="log_out_link"
        key={link.name}
        onClick={() => this.logoutHandler()}
      >
        {link.name}
      </div>
    ) : (
      <Link key={link.name} to={link.linkTo}>
        {link.name}
      </Link>
    );

  cardLink = link => {
    const user = this.props.user.userData;

    return (
      <div className="cart_link" key={link.name}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={link.linkTo}>{link.name}</Link>
      </div>
    );
  };

  showLinks = type => {
    const { userData } = this.props.user;
    let list = [];
    if (userData) {
      type.forEach(item => {
        if (!userData.isAuth) {
          if (item.public) {
            list.push(item);
          }
        } else {
          if (item.name !== 'Log in') {
            list.push(item);
          }
        }
      });
    }
    return list.map(link => {
      if (link.name !== 'My Cart') {
        return this.defaultLink(link);
      } else {
        return this.cardLink(link);
      }
    });
  };

  render() {
    const { user, page } = this.state;
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">WAVES</div>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(user)}</div>
            <div className="bottom">{this.showLinks(page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  logoutUser,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
