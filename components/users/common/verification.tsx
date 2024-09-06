"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image"; // Import the Image component
import { fetchSellerVerificationById } from "@/service/user.service";
import { getS3BasePath } from "@/config/aws";

const Verification = () => {
  const [verification, setVerification] = useState<any>(null);
  const [status, setStatus] = useState({
    label: "",
    colorClass: "",
    iconPath: "",
    iconColor: "",
  });
  const pathname = usePathname();
  const { id } = useParams();

  // Generic function to fetch verification based on user type
  const fetchVerification = async (userType: string, id: any) => {
    try {
      let response;
      if (userType === "seller") {
        response = await fetchSellerVerificationById(id);
      }
      const data = response?.data;
      setVerification(data);
    } catch (error) {
      toast.error("Error fetching business details");
    }
  };

  // Fetch verification data when pathname or id changes
  useEffect(() => {
    const userType = pathname.split("/")[2];
    fetchVerification(userType, id);
  }, [pathname, id]);

  // Update status based on the verification data
  useEffect(() => {
    const getVerificationStatus = () => {
      if (verification?.verification_status === "APPROVED") {
        setStatus({
          label: "Verified",
          colorClass: "text-green-800 bg-green-100",
          iconPath: "M5 13l4 4L19 7",
          iconColor: "text-green-600",
        });
      } else if (verification?.verification_status === "REJECTED") {
        setStatus({
          label: "UnVerified",
          colorClass: "text-red-800 bg-red-100",
          iconPath: "M6 18L18 6M6 6l12 12",
          iconColor: "text-red-600",
        });
      } else {
        setStatus({
          label: "Pending",
          colorClass: "text-yellow-800 bg-yellow-100",
          iconPath: "M12 8v4m0 4h.01",
          iconColor: "text-yellow-600",
        });
      }
    };

    getVerificationStatus();
  }, [verification]); // Run effect whenever verification data changes

  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md">
      {verification && (
        <>
          <div className="w-1/4">
            <Image
              src={getS3BasePath() + `users/${verification?.user_id}/verification/${verification?.code_image}`}
              alt="Verification Image"
              className="rounded-lg object-cover"
              width={150}
              height={150}
            />
          </div>
          <div className="flex items-start justify-center">
            <span
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${status.colorClass}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className={`w-4 h-4 ${status.iconColor}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={status.iconPath}
                />
              </svg>
              {status.label}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Verification;
