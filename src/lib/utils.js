import { ErrorToast } from "../components/global/Toaster";
import Cookies from "js-cookie";

export const processSignup = (data, navigate) => {
  if (data?.success) {
    navigate("/app/dashboard");
    return;
  }
};

export const processLogin = (data, navigate) => {
  if (data?.success) {
    Cookies.set("token", data?.data?.token, { expires: 7 });
    Cookies.set("admin", JSON.stringify(data?.data.admin), { expires: 7 });
    navigate("/dashboard");
    return;
  }
};

export const processError = (error) => {
  if (error?.response?.data?.message) {
    ErrorToast(error?.response?.data?.message);
    return;
  } else {
    ErrorToast("Something went wrong");
  }
};
