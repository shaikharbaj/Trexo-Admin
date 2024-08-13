import React from "react";
import CmsList from "@/components/cms/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <CmsList />;
};

export default Page;
