import React from 'react';
import UserLayout from '../../hoc/user';
import ManagaBrands from './manageBrands';
import ManageWoods from './manageWoods';

const ManagaCategories = () => {
  return (
    <UserLayout>
      <ManagaBrands />
      <ManageWoods />
    </UserLayout>
  );
};

export default ManagaCategories;
