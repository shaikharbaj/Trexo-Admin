import { getDictionary } from "@/app/dictionaries";
import Dashboard from "@/components/dashboard";

interface DashboardProps {}

const DashboardPage = async () => {
  const trans = await getDictionary('en');
  return <Dashboard trans={trans} />;
};

export default DashboardPage;
