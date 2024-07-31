import { pilotClient } from "@/http/http-client";

//Function to fetch doctype configuration
export const getDoctypeConfig = async (doctypeCode: string) => {
  try {
    const response = await pilotClient.get(
      `/doctypes?doctype_code=${doctypeCode}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch doctype config."
    );
  }
};
