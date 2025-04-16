import { useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { processError } from "../../lib/utils";
import { useNavigate } from "react-router";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postData = async (
    url,
    isFormData = false,
    formdata = null,
    data = null,
    callback
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(url, isFormData ? formdata : data);
      if (typeof callback === "function") {
        console.log(response);
        SuccessToast(response?.data?.message);
        callback(response?.data, navigate);
      }
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postData };
};

const useForgetPassword = () => {
  const [forgetLoader, setLoading] = useState(false);
  const navigate = useNavigate();
  const postData = async (
    url,
    isFormData = false,
    formdata = null,
    data = null,
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(url, isFormData ? formdata : data);
      SuccessToast(response?.data?.message)
      navigate("/auth/verify-otp",{state:{email:data.email}})
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { forgetLoader, postData };
};



const useResetVerification = () => {
  const [loading, setLoading] = useState(false);
  const verifyOtpPostData = async (url, data) => {
    try {
      setLoading(true);

      const response = await axios.post(url, data);
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading,verifyOtpPostData, };
};



const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const postData = async (
    url,
    isFormData = false,
    formdata = null,
    data = null,
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(url, isFormData ? formdata : data);
      SuccessToast(response?.data?.message)
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postData };
};



const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const postData = async (
    url,
    isFormData = false,
    formdata = null,
    data = null
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(url, isFormData ? formdata : data);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postData };
};

const useSetAvaliability = () => {
  const [loading, setLoading] = useState(false);
  const postData = async (
    url,
    isFormData = false,
    formdata = null,
    data = null,
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(url, isFormData ? formdata : data);
      SuccessToast(response?.data?.message)
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postData };
};
const useSetPrice = () => {
  const [priceLoading, setLoading] = useState(false);
  const postData = async (
    url,
    isFormData = false,
    formdata = null,
    data = null,
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(url, isFormData ? formdata : data);
      SuccessToast(response?.data?.message)
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { priceLoading, postData };
};


export { useLogin,useForgetPassword,useResetVerification,useResetPassword,useLogout,useSetAvaliability,useSetPrice };
