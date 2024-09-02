"use client";
import React from "react";
import ProfileHeader from "./profile-header";
import ProfileSidebar from "./profile-sidebar";
import BasicDetails from "./basic-details";

const AdminProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <ProfileHeader />
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 lg:col-span-4">
          <ProfileSidebar />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <BasicDetails />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminProfileLayout;
