import CustomerList from "@/components/customer/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <CustomerList />;
};

export default Page;
