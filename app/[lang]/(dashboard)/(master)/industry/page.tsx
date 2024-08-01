import React from "react";
import { getDictionary } from "@/app/dictionaries";
import IndustryList from "@/components/master/industry/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async ({
  params: { lang },
}) => {
  const trans = await getDictionary(lang);
  return <IndustryList trans={trans} />;
};

export default Page;
