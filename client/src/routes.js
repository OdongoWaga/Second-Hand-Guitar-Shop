import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/Home';
import AddProduct from './components/User/addProduct';
import Register from './components/LoginRegister/register';
import Login from './components/LoginRegister';
import ManageCategories from './components/User/manageCategories';
import UserDashboard from './components/User';
import Cart from './components/User/cart';
import UserProfile from './components/User/updateProfile';
import ManageSite from './components/User/manageSite';
import AddFile from './components/User/addFile';

import Shop from './components/Shop';
import ProductPage from './components/Product';

import ResetPass from './components/ResetUser/resetPass';
import ResetUser from './components/ResetUser';
import Page404 from './utils/page404';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/product/:id" exact component={Auth(ProductPage, null)} />

        <Route path="/user/cart" exact component={Auth(Cart, true)} />
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route path="/user/profile" exact component={Auth(UserProfile, true)} />

        <Route
          path="/admin/site-info"
          exact
          component={Auth(ManageSite, true)}
        />
        <Route
          path="/admin/add-product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage-categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route
          path="/admin/manage-files"
          exact
          component={Auth(AddFile, true)}
        />

        <Route path="/user/login" exact component={Auth(Login, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/user/register" exact component={Auth(Register, false)} />
        <Route
          path="/user/reset-user"
          exact
          component={Auth(ResetUser, false)}
        />
        <Route
          path="/user/reset-password/:token"
          exact
          component={Auth(ResetPass, false)}
        />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route component={Auth(Page404)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
