import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CountDown from "../../components/authentication/CountDown";
import { FaArrowLeft } from "react-icons/fa";
import { emailVerificationValues } from "../../init/authentication/LoginValues";
import { useForgetPassword, useResetVerification } from "../../hooks/api/Post";
import { FiLoader } from "react-icons/fi";
import { SuccessToast } from "../../components/global/Toaster";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(emailVerificationValues.otp);
  const inputs = useRef([]);
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const navigate = useNavigate("");
  const location = useLocation();
  const { forgetLoader, postData } = useForgetPassword();
  const handleRestart =async () => {
    const data = {
      email: location?.state?.email,
      role: "admin",
    };
   const res=await postData("auth/forgot", false, null, data, "");
   console.log(res);
   
    setSeconds(30);
    setIsActive(true);
  };


  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text");
    if (pastedData.length === otp.length) {
      setOtp(pastedData.split(""));
    }
    e.preventDefault();
  };

  const isOtpComplete = otp.join("").length < 5;

  const { loading,verifyOtpPostData } = useResetVerification();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const data = { email:location?.state?.email,otp: otpValue,role:"admin"};
    const response = await verifyOtpPostData("auth/verifyOTP", data);
    if (response?.success) {
      console.log(response);
      SuccessToast(response?.message);
      navigate("/auth/change-password");
    } else {
      console.error("OTP verification failed", response?.message);
    }
  };

  return (
    <div className="w-full h-full  grid md:grid-cols-2   rounded-[19px] bg-white">
      <div className="flex justify-center px-6 md:px-0 flex-col items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e)
          }}
          className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4"
        >
          <div className="text-start">
            <button>
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-[36px] mt-2 font-bold leading-[48px] capitalize">
            verification
            </h2>
            <p className="text-[14px] font-normal text-start mt-2 leading-[27px] text-[#868686]">
            Enter verification code sent to your email
            </p>
          </div>
          <div className="w-full h-auto flex justify-start items-center gap-4">
            {otp.map((_, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => (inputs.current[index] = el)}
                  className="w-[50px] h-[50px] rounded-[14px] bg-transparent outline-none text-center border-[1px] border-[#00000030] text-2xl focus-within:border-[#121820] flex items-center justify-center"
                />
              );
            })}
          </div>
          <p className="font-normal text-[13px] flex gap-2 leading-[19px] text-[#868686] ">
          Didn’t received code? 
            {isActive ? (
              <CountDown
                isActive={isActive}
                setIsActive={setIsActive}
                seconds={seconds}
                setSeconds={setSeconds}
              />
            ) : (
              <button
                type="button"
                onClick={handleRestart}
                disabled={isActive}
                className="outline-none text-[13px] border-none flex gap-2 items-center justify-center text-[#199BD1] font-bold"
              >
               Resend now
               {forgetLoader && <FiLoader className="animate-spin text-lg " />}
              </button>
            )}
          </p>
          <button
            type="submit"
            disabled={isOtpComplete}
            className="w-full h-[49px] rounded-[8px] bg-[#000000] text-white flex gap-2 items-center justify-center text-md font-medium"
          >
            <span>Verify</span>
              {loading && <FiLoader className="animate-spin text-lg " />}
          </button>
        </form>
      </div>
      <div className="h-full  hidden md:flex w-full bg-[#EDEDED]"></div>
    </div>
  );
}
