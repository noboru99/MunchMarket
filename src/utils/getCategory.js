import axiosInstance from "./axios"

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get("/categories");
        // console.log(response.data)
        return response.data.data
    } catch (error) {
        console.log("statusCode", error.response.status);
        console.log("messageCode", error.response.data.message);
        return false;
    }
}

