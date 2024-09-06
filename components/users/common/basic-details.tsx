"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  fetchAdminBasicDetailsById,
  fetchConsumerBasicDetailsById,
} from "@/service/user.service";
import { Label } from "@/components/ui/label";
interface IBasicDetailsProps {
  props?: any;
}

const BasicDetails: React.FC<IBasicDetailsProps> = ({ props }) => {
  const [basicinformation, setBasicInformation] = useState<any>(null);
  const pathname = usePathname();
  const { id } = useParams();

  // Generic function to fetch basic details based on user type
  const fetchBasicDetails = async (userType: string, id: any) => {
    try {
      let response;
      switch (userType) {
        case "admin":
          response = await fetchAdminBasicDetailsById(id);
          break;
        case "consumer":
          response = await fetchConsumerBasicDetailsById(id);
          break;
      }
      const data = response?.data;
      setBasicInformation(data);
    } catch (error) {
      console.error("Error fetching basic details:", error);
    }
  };

  useEffect(() => {
    const userType = pathname.split("/")[2];
    fetchBasicDetails(userType, id);
  }, [pathname, id]);

  return (
    <>
      <div className="container">
        <div className="p-4">
          <div className="space-y-4">
            <div className="grid gap-8 grid-cols-2">
              <div>
                <Label className="mb-2" htmlFor="first_name">
                  First Name
                </Label>
                <p>{basicinformation?.first_name}</p>
              </div>
              <div>
                <Label className="mb-2" htmlFor="last_name">
                  Last Name
                </Label>
                <p>{basicinformation?.last_name}</p>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-2">
              <div>
                <Label className="mb-2" htmlFor="email">
                  Email
                </Label>
                <p>{basicinformation?.email}</p>
              </div>
              <div>
                <Label className="mb-2" htmlFor="mobile_number">
                  Mobile Number
                </Label>
                <p>{basicinformation?.mobile_number}</p>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-2">
              <div>
                <Label className="mb-2" htmlFor="gst_number">
                  GST Number
                </Label>
                <p>{basicinformation?.gst_number}</p>
              </div>
              <div>
                <Label className="mb-2" htmlFor="pan_card_number">
                  PAN Card Number
                </Label>
                <p>{basicinformation?.pan_card_number}</p>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-2">
              <div>
                <Label className="mb-2" htmlFor="status">
                  Status
                </Label>
                <p>{basicinformation?.status}</p>
              </div>
              <div>
                <Label className="mb-2" htmlFor="pincode">
                  Pincode
                </Label>
                <p>{basicinformation?.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicDetails;
