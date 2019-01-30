import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
  {
    name: 'My Acconunt',
    linkTo: '/user/dashboard',
  },
  {
    name: 'User information',
    linkTo: '/user/profile',
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart',
  },
];

const admin = [
  {
    name: 'Site info',
    linkTo: '/admin/site-info',
  },
  {
    name: 'Add products',
    linkTo: '/admin/add-product',
  },
  {
    name: 'Manage categories',
    linkTo: '/admin/manage-categories',
  },
  {
    name: 'Upload file',
    linkTo: '/admin/manage-files',
  },
];

const UserLayout = props => {
  const generateLinks = links => {
    return links.map(link => (
      <Link key={link.linkTo} to={link.linkTo}>
        {link.name}
      </Link>
    ));
  };

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">{generateLinks(links)}</div>
          {props.user.userData && props.user.userData.isAdmin ? (
            <div>
              <h2>Admin</h2>
              <div className="links">{generateLinks(admin)}</div>
            </div>
          ) : null}
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserLayout);
