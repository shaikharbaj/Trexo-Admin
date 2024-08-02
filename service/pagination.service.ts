import { setPageIndex, setPageSize } from "@/redux/slice/paginate.slice";
import { store } from "@/redux/store";


//Function to set page size
export const setPage = async (value: number) => {
    try {
        store.dispatch(setPageSize(value));
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
};

//Function to manage next and previous page
export const navigatePage = async (value: number) => {
    try {
        store.dispatch(setPageIndex(value));
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
};