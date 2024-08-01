import React from "react";
import { getDictionary } from "@/app/dictionaries";
import CategoryList from "@/components/category/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async ({
  params: { lang },
}) => {
  const trans = await getDictionary(lang);
  return <CategoryList trans={trans} />;
};

export default Page;
