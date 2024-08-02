import React from "react";

import GlobalSetting from "@/components/global-setting/global-setting";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  const trans = {};
  return <GlobalSetting trans={trans} />;
};

export default Page;
