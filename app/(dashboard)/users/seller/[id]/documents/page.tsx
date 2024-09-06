import React from "react";
import Document from "@/components/users/common/documents";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <Document />;
};

export default Page;
