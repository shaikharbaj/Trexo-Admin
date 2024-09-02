"use client";

import React from "react";
import UserProfileLayout from "@/components/layout/users-profile.layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <UserProfileLayout>{children}</UserProfileLayout>;
};

export default Layout;
