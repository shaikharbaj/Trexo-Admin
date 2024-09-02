import AdminProfileLayout from "@/components/profile/admin-profile-layout";
export const metadata = {
  title: "User Profile",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AdminProfileLayout>{children}</AdminProfileLayout>;
};

export default Layout;
