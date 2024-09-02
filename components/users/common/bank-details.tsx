"use client";
import { Label } from "@/components/ui/label";
import {
  fetchSellerBankDetailsById,
} from "@/service/user.service";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Bankdetails = () => {
  const [bankdetails, setBankDetails] = useState<any>(null);
  const pathname = usePathname();
  const { id } = useParams();


  // Generic function to fetch bank details based on user type
  const fetchBankDetails = async (userType: string, id: any) => {
    try {
      let response;
      switch (userType) {
        case "seller":
          response = await fetchSellerBankDetailsById(id);
          break;
      }
      const data = response?.data;
      setBankDetails(data);
    } catch (error) {
      console.error("Error fetching basic details:", error);
    }
  };

  useEffect(() => {
    const userType = pathname.split("/")[2];
    fetchBankDetails(userType, id);
  }, [pathname, id]);
  return (
    <div>
      <div className="container">
        <React.Fragment>
          <div className="mt-2 mb-1 text-default-900 font-semibold text-base">
            <div className="space-y-4 mb-6">
              <div className="space-y-3">
                <div className="grid gap-8 grid-cols-3">
                  <div className="">
                    <Label className="mb-2" htmlFor="account_holder_name">
                      Account Holder Name <span className="text-warning">*</span>
                    </Label>
                    <p>{bankdetails?.account_holder_name}</p>
                  </div>
                  <div className="">
                    <Label className="mb-2" htmlFor="account_number">
                      Account Number <span className="text-warning">*</span>
                    </Label>
                    <p>{bankdetails?.account_number}</p>
                  </div>
                </div>
                <div className="grid gap-8 grid-cols-3">
                  <div className="">
                    <Label className="mb-2" htmlFor="ifsc_code">
                      IFSC Code <span className="text-warning">*</span>
                    </Label>
                    <p>{bankdetails?.ifsc_code}</p>
                  </div>
                  <div className="">
                    <Label className="mb-2" htmlFor="branch_name">
                      Branch <span className="text-warning">*</span>
                    </Label>
                    <p>{bankdetails?.branch_name}</p>
                  </div>
                </div>
                <div className="grid gap-8 grid-cols-3">
                  <div className="">
                    <Label className="mb-2" htmlFor="account_type">
                      Account Type <span className="text-warning">*</span>
                    </Label>
                    <p>{bankdetails?.account_type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Bankdetails;