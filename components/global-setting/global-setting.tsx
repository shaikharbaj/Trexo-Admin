"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlobalSettingForm } from "../forms";

interface IGlobalSettingProps {
  trans: {
    [key: string]: string;
  };
}

const GlobalSetting: React.FunctionComponent<IGlobalSettingProps> = ({
  trans,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Setting</BreadcrumbItem>
          <BreadcrumbItem>Global Setting</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            Global Setting
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12">
          <CardContent>
          <GlobalSettingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalSetting;
