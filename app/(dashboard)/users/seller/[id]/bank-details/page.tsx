import React from "react";
import Bankdetails from "@/components/users/common/bank-details";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <Bankdetails />;
};

export default Page;
