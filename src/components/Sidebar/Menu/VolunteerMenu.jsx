import React from "react";
import MenuItem from "./MenuItem";

const VolunteerMenu = () => {
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
    </>
  );
};

export default VolunteerMenu;
