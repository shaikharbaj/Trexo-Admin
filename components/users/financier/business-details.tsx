"use client";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import {
    fetchFinancierBasicDetailsById,
} from "@/service/user.service";
import { financiertabs } from "@/utils/profile-tabs";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BusinessDetails = () => {
    const [tabs, setTabs] =
        useState<{ label: string; value: string }[]>(financiertabs);
    const [loading, setLoading] = useState<boolean>(false);
    const [businessDetails, setBusinessDetails] = useState<any>(null);
    const pathname = usePathname();
    const { id } = useParams();
    // Generic function to fetch basic details based on user type
    const fetchBusinessDetails = async (id: any) => {
        setLoading(true);
        try {
            let response = await fetchFinancierBasicDetailsById(id);
            const data = response?.data;
            setBusinessDetails(data);
        } catch (error) {
            toast.error("Error fetching business details:");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBusinessDetails(id);
    }, [pathname, id]);

    function createSlug(product_category_id: any, categoryMeta: any) {
        if (product_category_id && categoryMeta) {
            const categoryIds = Array.isArray(businessDetails?.product_category_id)
                ? businessDetails?.product_category_id
                : [businessDetails?.product_category_id];

            return categoryIds
                .map((id: any) => businessDetails?.categoryMeta[id])
                .filter((name: any) => name !== undefined)
                .join(", ");
        }
    }

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
                            <ProfileSidebar basicinformation={businessDetails} />
                        </div>
                        <div className="col-span-12 lg:col-span-8">
                            <ProfileTabs tabs={tabs}>
                                <div className="rounded-lg pt-3 max-w-2xl mx-auto">
                                    <div className="mb-6">
                                        <h2 className="text-sm text-gray-500 font-medium">Business Name</h2>
                                        <p className="font-semibold">
                                            {businessDetails?.company_name}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div>
                                            <h3 className="text-sm text-gray-500 font-medium">
                                                Product / Services
                                            </h3>
                                            <p className="text-gray-800">
                                                {businessDetails?.company_offerings}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500 font-medium">
                                                Product Industry
                                            </h3>
                                            <p className="text-gray-800">
                                                {businessDetails?.product_industry}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500 font-medium">
                                                Product Category
                                            </h3>
                                            <p className="text-gray-800">
                                                {createSlug(
                                                    businessDetails?.product_category_id,
                                                    businessDetails?.categoryMeta
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500 font-medium">GST Number</h3>
                                            <p className="text-gray-800 flex items-center">
                                                {businessDetails?.gst_number}
                                                {businessDetails?.gst_number && (
                                                    <span className="ml-2 text-green-500">✔️</span>
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500 font-medium">PAN Number</h3>
                                            <p className="text-gray-800 flex items-center">
                                                {businessDetails?.pan_card_number}
                                                {businessDetails?.gst_number && (
                                                    <span className="ml-2 text-green-500">✔️</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm text-gray-500 font-medium mb-2">
                                            Shipping Address
                                        </h2>
                                        <p className="text-gray-800">
                                            {
                                                [
                                                    businessDetails?.UserAddress[0]?.address1,
                                                    businessDetails?.UserAddress[0]?.address2,
                                                    businessDetails?.UserAddress[0]?.landmark,
                                                    businessDetails?.UserAddress[0]?.city,
                                                    businessDetails?.UserAddress[0]?.state,
                                                    businessDetails?.UserAddress[0]?.country,
                                                    businessDetails?.UserAddress[0]?.pincode,
                                                ]
                                                    .filter(Boolean) // Removes any falsy values (like undefined or null)
                                                    .join(", ") // Joins the array elements with a comma
                                            }
                                        </p>
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

export default BusinessDetails;