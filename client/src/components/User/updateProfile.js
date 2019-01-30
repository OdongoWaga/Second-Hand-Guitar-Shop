import React from 'react';
import UserLayout from '../../hoc/user';
import PersonalInfo from './personalInfo';

const UpdateProfile = () => {
  return (
    <UserLayout>
      <h1>Profile</h1>
      <PersonalInfo />
    </UserLayout>
  );
};

export default UpdateProfile;
