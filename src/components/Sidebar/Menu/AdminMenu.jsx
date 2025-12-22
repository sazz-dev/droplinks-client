import React from "react";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        iconName="createrequest-outline"
        label="Create Request"
        address="/dashboard/create-request"
      />
      <MenuItem
        iconName="bloods-outline"
        label="All Blood Requests"
        address="/dashboard/all-blood-requests"
      />
      <MenuItem
        iconName="wallet-outline"
        label="Funding"
        address="/dashboard/funding"
      />
      <MenuItem
        iconName="users-outline"
        label="Manage Users"
        address="/dashboard/manage-users"
      />
    </>
  );
};

export default AdminMenu;
