import { getDictionary } from "@/app/dictionaries";
import DashboardLayout from "@/components/layout/dashboard-layout";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";

const layout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: any };
}) => {
  const trans = await getDictionary(lang);
  return (
    <DashboardLayout trans={trans}>{children}</DashboardLayout>
  );
};

export default layout;
