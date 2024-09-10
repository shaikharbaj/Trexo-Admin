"use client";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { Label } from "@/components/ui/label";
import {
    fetchSellerBankDetailsById,
    fetchSellerBasicDetailsById,
    updateBankDetailsStatus,
} from "@/service/user.service";
import { sellertabs } from "@/utils/profile-tabs";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Bankdetails = () => {
    const [bankdetails, setBankDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [basicinformation, setBasicInformation] = useState<any>(null);
    const [tabs, setTabs] =
        useState<{ label: string; value: string }[]>(sellertabs);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [reason, setReason] = useState("");
    const pathname = usePathname();
    const { id } = useParams();


    // Generic function to fetch bank details based on user type
    const fetchBankDetails = async (id: any) => {
        try {
            const response = await fetchSellerBankDetailsById(id);
            const data = response?.data;
            setBankDetails(data);
        } catch (error) {
            console.error("Error fetching basic details:", error);
        }
    };

    // Generic function to fetch basic details based on user type
    const fetchBasicDetails = async (id: any) => {
        try {
            let response = await fetchSellerBasicDetailsById(id);
            const data = response?.data;
            (data);
            setBasicInformation(data);
        } catch (error) {
            toast.error("Error fetching business details:");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchBasicDetails(id), fetchBankDetails(id)]);
            setLoading(false); // Set loading to false once both API calls are done
        };

        fetchData();
    }, [pathname, id]);

    const handleApprove = async () => {
        setStatus("APPROVED");
        setReason("");
        try {
            const payload = {
                uuid: id,
                admin_status: "APPROVED",
            };
            const response = await updateBankDetailsStatus(payload);
            if (response?.status === false) {
                toast.error(response?.message);
                return;
            }
            const userType = pathname.split("/")[2];
            fetchBankDetails(id);
            toast.success(response.message);
        } catch (error: any) {
            toast.error(error?.message || "An error occurred");
        }
        setError("");
        setStatus("");
        setReason("");
    };

    const handleReject = () => {
        setStatus("REJECTED");
    };

    const handleReasonChange = (e: any) => {
        setReason(e.target.value);
    };
    const handleRejectSubmit = async () => {
        try {
            const payload = {
                uuid: id,
                admin_status: "REJECTED",
                reason: reason,
            };
            if (!reason) {
                setError("Please provide reason");
                return;
            }
            const response = await updateBankDetailsStatus(payload);
            if (response?.status === false) {
                toast.error(response?.message);
                return;
            }
            fetchBankDetails(id);
            toast.success(response.message);
        } catch (error: any) {
            toast.error(error?.message || "An error occurred");
        }
        setError("");
        setStatus("");
        setReason("");
    };

    return (
        <>
            {loading ? (
                <>
                    <LayoutLoader />
                </>
            ) : (
                <React.Fragment>
                    <div className="grid grid-cols-12 gap-6 mt-6">
                        <div className="col-span-12 lg:col-span-4">
                            <ProfileSidebar basicinformation={basicinformation} />
                        </div>
                        <div className="col-span-12 lg:col-span-8">
                            <ProfileTabs tabs={tabs}>
                                <div className="container">
                                    <p className="text-blue-500 font-medium mb-3">
                                        Status:{" "}
                                        <span
                                            className={`${bankdetails?.banking_status === "APPROVED"
                                                ? "text-green-500"
                                                : bankdetails?.banking_status === "REJECTED"
                                                    ? "text-red-500"
                                                    : "text-yellow-500"
                                                }`}
                                        >
                                            {bankdetails?.banking_status === "APPROVED"
                                                ? "Approved"
                                                : bankdetails?.banking_status === "REJECTED"
                                                    ? "Rejected"
                                                    : "Pending"}
                                        </span>
                                    </p>
                                    <div className="mt-2 mb-1 text-default-900 text-base">
                                        <div className="space-y-4 mb-6">
                                            <div className="space-y-3">
                                                <div className="grid gap-8 grid-cols-3">
                                                    <div className="">
                                                        <Label className="mb-2" htmlFor="account_holder_name">
                                                            Account Holder Name
                                                        </Label>
                                                        <p>{bankdetails?.account_holder_name}</p>
                                                    </div>
                                                    <div className="">
                                                        <Label className="mb-2" htmlFor="account_number">
                                                            Account Number
                                                        </Label>
                                                        <p>{bankdetails?.account_number}</p>
                                                    </div>
                                                </div>
                                                <div className="grid gap-8 grid-cols-3">
                                                    <div className="">
                                                        <Label className="mb-2" htmlFor="ifsc_code">
                                                            IFSC Code
                                                        </Label>
                                                        <p>{bankdetails?.ifsc_code}</p>
                                                    </div>
                                                    <div className="">
                                                        <Label className="mb-2" htmlFor="branch_name">
                                                            Branch
                                                        </Label>
                                                        <p>{bankdetails?.branch_name}</p>
                                                    </div>
                                                </div>
                                                <div className="grid gap-8 grid-cols-3">
                                                    <div className="">
                                                        <Label className="mb-2" htmlFor="account_type">
                                                            Account Type
                                                        </Label>
                                                        <p>{bankdetails?.account_type}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={handleApprove}
                                                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-full focus:outline-none"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleReject}
                                                className="border border-blue-500 text-blue-500 py-2 px-4 rounded-full focus:outline-none"
                                            >
                                                Reject
                                            </button>
                                        </div>

                                        {status === "REJECTED" && (
                                            <>
                                                <div className="flex flex-col gap-2 mb-3 mt-5">
                                                    <label htmlFor="reason" className="text-gray-700">
                                                        Reason for Rejection:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="reason"
                                                        value={reason}
                                                        onChange={handleReasonChange}
                                                        className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter reason"
                                                        required
                                                    />
                                                    {error && <div className=" text-destructive">{error}</div>}
                                                </div>
                                                <button
                                                    onClick={() => handleRejectSubmit()}
                                                    type="button"
                                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                                                >
                                                    Submit
                                                </button>
                                            </>
                                        )}
                                    </div>

                                </div>
                            </ProfileTabs>
                        </div>
                    </div>
                </React.Fragment>

            )}

        </>
    );
};

export default Bankdetails;