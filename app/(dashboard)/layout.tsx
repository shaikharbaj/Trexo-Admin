import { getDictionary } from "@/app/dictionaries";
import DashboardLayout from "@/components/layout/dashboard-layout";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";

const layout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const trans = await getDictionary('en');
  return (
    <DashboardLayout trans={trans}>{children}</DashboardLayout>
  );
};

export default layout;
