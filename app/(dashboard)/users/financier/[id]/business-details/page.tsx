import React from "react";
import BusinessDetails from "@/components/users/common/business-details";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <BusinessDetails />;
};

export default Page;
