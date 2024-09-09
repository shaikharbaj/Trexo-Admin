"use client";
import { getS3BasePath } from "@/config/aws";
import { fetchSellerDocumentById } from "@/service/user.service";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AWS_URL = getS3BasePath();

const Document = () => {
  const [documents, setDocuments] = useState<any>([]);
  const pathname = usePathname();
  const { id } = useParams();

  const titles: any = {
    chequeFile: "Cancelled check / Bank Statement",
    gstFile: "Gst Certificate",
    signatureFile: "Signature",
    Passport: "Passport",
    "Aadhar card": "Aadhar card",
    "Pan card": "Pan card",
  };
  // Generic function to fetch documents based on user type
  const fetchDocument = async (userType: string, id: any) => {
    try {
      let response;
      if (userType == "seller") {
        response = await fetchSellerDocumentById(id);
      }
      const data = response?.data;
      setDocuments(data);
    } catch (error) {
      toast.error("Error fetching documents ");
    }
  };

  useEffect(() => {
    const userType = pathname.split("/")[2];
    fetchDocument(userType, id);
  }, [pathname, id]);

  const downloadDocumentHandler = (doc: string, user_id: number) => {
    const link = document.createElement("a");
    const fileUrl = `${AWS_URL}/users/${user_id}/documents/${doc}`;
    link.href = fileUrl;
    link.download = doc;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="max-w-md ms-3 mt-3 space-y-6">
      {documents?.length > 0 &&
        documents?.map((doc: any, index: number) => (
          <div key={index}>
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
                onClick={() =>
                  downloadDocumentHandler(doc.document, doc?.user_id)
                }
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
          </div>
        ))}
    </div>
  );
};

export default Document;
