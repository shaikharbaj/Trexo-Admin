"use client";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { getS3BasePath } from "@/config/aws";
import { fetchSellerBasicDetailsById, fetchSellerDocumentById } from "@/service/user.service";
import { sellertabs } from "@/utils/profile-tabs";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AWS_URL = getS3BasePath();

const Document = () => {
    const [documents, setDocuments] = useState<any>([]);
    const [basicinformation, setBasicInformation] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [tabs, setTabs] = useState<{ label: string; value: string }[]>(sellertabs);
    const [documentStates, setDocumentStates] = useState<any>({});
    const [messages, setMessages] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const pathname = usePathname();
    const { id } = useParams();

    const titles: any = {
        chequeFile: "Cancelled check / Bank Statement",
        gstFile: "GST Certificate",
        signatureFile: "Signature",
        Passport: "Passport",
        "Aadhar card": "Aadhar card",
        "Pan card": "Pan card",
    };

    // Fetch documents based on user type
    const fetchDocument = async (id: any) => {
        try {
            const response = await fetchSellerDocumentById(id);
            const data = response?.data.map((doc: any) => ({
                ...doc,
                status: doc.document_status || "Pending", // Default to status from API or "Pending"
            }));
            setDocuments(data);
        } catch (error) {
            toast.error("Error fetching documents");
        }
    };

    // Fetch basic details based on user type
    const fetchBasicDetails = async (id: any) => {
        try {
            const response = await fetchSellerBasicDetailsById(id);
            const data = response?.data;
            setBasicInformation(data);
        } catch (error) {
            toast.error("Error fetching business details");
        }
    };

    // Handle document download
    const downloadDocumentHandler = (doc: string, user_id: number) => {
        const link = document.createElement("a");
        const fileUrl = `${AWS_URL}/users/${user_id}/documents/${doc}`;
        link.href = fileUrl;
        link.download = doc;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchBasicDetails(id), fetchDocument(id)]);
            setLoading(false);
        };

        fetchData();
    }, [pathname, id]);

    // Handle approval/rejection of a document
    const handleDocumentState = (uuid: string, state: string) => {
        setDocuments((prevDocs: any) =>
            prevDocs.map((document: any) =>
                document.uuid === uuid ? { ...document, status: state } : document
            )
        );
    };

    // Handle rejection message input
    const handleMessageChange = (uuid: string, message: string) => {
        setMessages((prevMessages: any) => ({
            ...prevMessages,
            [uuid]: message,
        }));
        // Clear error when user starts typing
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [uuid]: "",
        }));
    };

    // Handle submit action for rejected documents
    const handleSubmit = (uuid: string) => {
        const message = messages[uuid];
        if (!message) {
            // Show error if message is empty
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                [uuid]: "Rejection reason is required",
            }));
            return;
        }

        console.log(`Rejection message for ${uuid}:`, message);
        // Perform submit action, e.g., update API
    };

    return (
        <>
            {loading ? (
                <LayoutLoader />
            ) : (
                <React.Fragment>
                    <div className="grid grid-cols-12 gap-6 mt-6">
                        <div className="col-span-12 lg:col-span-4">
                            <ProfileSidebar basicinformation={basicinformation} />
                        </div>
                        <div className="col-span-12 lg:col-span-8">
                            <ProfileTabs tabs={tabs}>
                                <div className="max-w-xl ms-3 mt-3 space-y-6">
                                    {documents?.length > 0 &&
                                        documents.map((doc: any) => (
                                            <div key={doc.uuid} className="border p-4 rounded-lg shadow">
                                                <div className="mb-2">
                                                    <p className="text-sm">
                                                        Status:{" "}
                                                        <span
                                                            className={
                                                                doc.status === "Approved"
                                                                    ? "text-green-500"
                                                                    : doc.status === "Rejected"
                                                                        ? "text-red-500"
                                                                        : "text-gray-500"
                                                            }
                                                        >
                                                            {doc.status}
                                                        </span>
                                                    </p>
                                                </div>
                                                <p className="text-gray-500 text-sm mb-2">
                                                    {titles[doc?.document_name]}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 text-red-500"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M12 11V7m0 4v4m-3-4h6m-6 0v4m0-4H9m6 0h-3"
                                                            />
                                                        </svg>
                                                        <span className="text-gray-800 font-medium">
                                                            {doc.document}
                                                        </span>
                                                    </div>
                                                    <button
                                                        className="text-red-500 hover:text-red-700 border border-red-500 rounded"
                                                        onClick={() => downloadDocumentHandler(doc.document, doc?.user_id)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            className="w-6 h-6 text-red-500"
                                                        >
                                                            <path
                                                                d="M11.292 16.706a1 1 0 0 0 1.416 0l3-3a1 1 0 0 0-1.414-1.414L13 13.586V4a1 1 0 0 0-2 0v9.586l-1.293-1.293a1 1 0 0 0-1.414 1.414zM17 19H7a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2z"
                                                                fill="red"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="flex space-x-2 mt-4">
                                                    <button
                                                        className="text-green-500 hover:text-green-700 border border-green-500 rounded px-2 py-1"
                                                        onClick={() => handleDocumentState(doc.uuid, "Approved")}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="text-red-500 hover:text-red-700 border border-red-500 rounded px-2 py-1"
                                                        onClick={() => handleDocumentState(doc.uuid, "Rejected")}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>

                                                {doc.status === "Rejected" && (
                                                    <div className="mt-2 space-y-2">
                                                        <textarea
                                                            className="w-full border rounded px-3 py-2 text-sm"
                                                            placeholder="Add a rejection reason..."
                                                            value={messages[doc.uuid] || ""}
                                                            onChange={(e) =>
                                                                handleMessageChange(doc.uuid, e.target.value)
                                                            }
                                                        />
                                                        {errors[doc.uuid] && (
                                                            <p className="text-red-500 text-sm">
                                                                {errors[doc.uuid]}
                                                            </p>
                                                        )}
                                                        <button
                                                            className="text-white bg-red-500 hover:bg-red-700 rounded px-3 py-2"
                                                            onClick={() => handleSubmit(doc.uuid)}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </ProfileTabs>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </>
    );
};

export default Document;
