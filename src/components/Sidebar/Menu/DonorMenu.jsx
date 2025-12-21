import React from "react";
import MenuItem from "./MenuItem";

const DonorMenu = () => {
  return (
    <>
      <MenuItem
        iconName="createrequest-outline"
        label="Create Request"
        address="/dashboard/create-request"
      />
      <MenuItem
        iconName="bloods-outline"
        label="My Blood Requests"
        address="/dashboard/my-blood-requests"
      />
    </>
  );
};

export default DonorMenu;
