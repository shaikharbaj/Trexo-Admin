"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
    fetchAdminBasicDetailsById,
} from "@/service/user.service";
import { Label } from "@/components/ui/label";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { admintabs } from "@/utils/profile-tabs";
import LayoutLoader from "@/components/layout-loader";

interface IBasicDetailsProps {
    props?: any;
}

const BasicDetails: React.FC<IBasicDetailsProps> = ({ props }) => {
    const [basicinformation, setBasicInformation] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [tabs, setTabs] =
        useState<{ label: string; value: string }[]>(admintabs);
    const pathname = usePathname();
    const { id } = useParams();

    // Generic function to fetch basic details based on user type
    const fetchBasicDetails = async (id: any) => {
        setLoading(true);
        try {
            let response = await fetchAdminBasicDetailsById(id);
            const data = response?.data;
            setBasicInformation(data);
        } catch (error) {
            console.error("Error fetching basic details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBasicDetails(id);
    }, [pathname, id]);

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
                            </ProfileTabs>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </>
    );
};

export default BasicDetails;
