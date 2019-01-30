import React from 'react';
import UserLayout from '../../hoc/user';
import { Button } from '../../components/ui/button';
import HistoryBlock from './historyBlock';

const UserDashboard = ({ user }) => {
  const name = user.userData ? user.userData.name : 'name';
  const lastname = user.userData ? user.userData.lastname : 'lastname';
  const email = user.userData ? user.userData.email : 'email';

  return (
    <UserLayout>
      <div className="user_nfo_panel">
        <h1>User information</h1>
        <div>
          <span>Name: {name}</span>
          <span>Lastname: {lastname}</span>
          <span>Email: {email}</span>
        </div>
        <Button
          type="default"
          title="Edit account info"
          linkTo="/user/profile"
        />
      </div>

      <div className="user_nfo_panel">
        <h2>History purchases</h2>
        {user.userData.history ? (
          <div className="user_product_block_wrapper">
            <HistoryBlock products={user.userData.history} />
          </div>
        ) : null}
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
