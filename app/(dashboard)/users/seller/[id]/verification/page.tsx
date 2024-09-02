import React from "react";
import Verification from "@/components/users/common/verification";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <Verification />;
};

export default Page;
