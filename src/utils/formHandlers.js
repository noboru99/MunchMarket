import axiosInstance from "./axios"

export const handleCheckIDAvailability = async (
  body,
  setIsLoading,
  setIsUserIdChecked,
  setError
) => {
    setIsLoading(true);
    setError("");
    setIsUserIdChecked(null);
  try {
    const response = await axiosInstance.post(`/validate`, body, {
      // 쿼리 파라미터로 loginId 전달
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
      console.log("response", response)
    return response.data;
  } catch (error) {
      console.log("statusCode", error.response.status);
      console.log("messageCode", error.response.data.message);
      setError(error);
    setIsUserIdChecked(false);
    console.log(error)
    return false
  } finally {
    setIsLoading(false);
  }
};


export const handleCheckPhoneVerify = async (
  body,
  setIsLoading,
  setIsPhoneNumberSending,
  setError
) => {
  setIsLoading(true);
  setError("");
  try {
    const response = await axiosInstance.post(`/send-sms`, body, {
      // 쿼리 파라미터로 loginId 전달
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    setIsPhoneNumberSending(true);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("statusCode", error.response.status);
    console.log("messageCode", error.response.data.message);
    setError(error);
    setIsPhoneNumberSending(false);
  } finally {
    setIsLoading(false);
  }
};

export const CheckAuthenticationCode = async (
  body,
  setIsLoading,
  setCheckedPhoneVerifiedCode,
  setError
) => {
  setIsLoading(true);
  setError("");
  setCheckedPhoneVerifiedCode(null);
  try {
    const response = await axiosInstance.post(`/verification-code`, body, {
      // 쿼리 파라미터로 loginId 전달
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("statusCode", error.response.status);
    console.log("messageCode", error.response.data.message);
    setError(error);
    setCheckedPhoneVerifiedCode(false);
  } finally {
    setIsLoading(false);
  }
};

export const handleCheckEmailAvailability = async (
  body,
  setIsLoading,
  setIsUserEmailChecked,
  setError
) => {
  setIsLoading(true);
  setError("");
  setIsUserEmailChecked(null);
  try {
    const response = await axiosInstance.post(`/validate`, body, {
      // 쿼리 파라미터로 loginId 전달
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("statusCode", error.response.status);
    console.log("messageCode", error.response.data.message);
    setError(error);
    setIsUserEmailChecked(false);
    return false;
  } finally {
    setIsLoading(false);
  }
};