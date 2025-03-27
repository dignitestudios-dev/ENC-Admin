import ChangePassword from "../../pages/authentication/ChangePassword";
import ForgetPassword from "../../pages/authentication/ForgetPassword";
import Login from "../../pages/authentication/Login";
import VerifyOtp from "../../pages/authentication/VerifyOtp";

export const AuthRoute=[
    {
        url: "login",
        page: <Login />,
        name: "Login",
        isPublic: true,
      },
      {
        url: "forgot-password",
        page: <ForgetPassword />,
        name: "Forgot Password",
        isPublic: true,
      },
      {
        url: "verify-otp",
        page: <VerifyOtp/>,
        name: "Verify OTP",
        isPublic: true,
      },
      {
        url: "change-password",
        page: <ChangePassword />,
        name: "Change Password",
        isPublic: true,
      },
]