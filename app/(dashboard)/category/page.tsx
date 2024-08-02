import React from "react";
import CategoryList from "@/components/category/list";

interface IPageProps {
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  const trans = {};
  return <CategoryList trans={trans} />;
};

export default Page;
