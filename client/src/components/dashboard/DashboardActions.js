import React from "react";
import { Link } from "react-router-dom";
import { HiAcademicCap, HiBriefcase, HiUser } from "react-icons/hi";

const DashboardAction = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn btn-light'>
        <HiUser className='text-primary react-icons' />
        {"  "}
        <span>Edit Profile</span>
      </Link>
      <Link to='/add-experience' class='btn btn-light'>
        <HiBriefcase className='text-primary react-icons' />
        {"  "}
        <span>Add Experience</span>
      </Link>
      <Link to='/add-education' class='btn btn-light'>
        <HiAcademicCap className='text-primary react-icons' />
        {"  "}
        <span>Add Education</span>
      </Link>
    </div>
  );
};

export default DashboardAction;
