import React from 'react';
import { Button } from '../ui/button';
import Login from './login';

const UserForm = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Ut Lorem culpa esse culpa ex dolore qui labore consectetur.Minim
              exercitation dolor non ut cupidatat.Consequat aliquip sint eu sunt
              excepteur voluptate ex occaecat laborum aute tempor sit magna
              magna.
            </p>

            <Button
              type="default"
              title="Create an Account"
              linkTo="/user/register"
            />
          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account please log in</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
