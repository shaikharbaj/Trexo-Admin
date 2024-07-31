import React from "react";
import { getDictionary } from "@/app/dictionaries";
import GlobalSetting from "@/components/global-setting/global-setting";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async ({
  params: { lang },
}) => {
  const trans = await getDictionary(lang);
  return <GlobalSetting trans={trans} />;
};

export default Page;
