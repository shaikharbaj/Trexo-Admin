import React from "react";
import SocialMediaList from "@/components/social_media/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <SocialMediaList />;
};

export default Page;
