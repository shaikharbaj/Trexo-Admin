import SellerList from "@/components/seller/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <SellerList />;
};

export default Page;
