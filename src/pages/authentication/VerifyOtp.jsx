import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import CountDown from "../../components/authentication/CountDown";
import { FaArrowLeft } from "react-icons/fa";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef([]);
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const navigate = useNavigate("");
  const handleRestart = () => {
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

  return (
    <div className="w-full h-full  grid grid-cols-2   rounded-[19px] bg-white">
      <div className="flex justify-center flex-col items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/auth/change-password");
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
                className="outline-none text-[13px] border-none text-[#199BD1] font-bold"
              >
               Resend now
              </button>
            )}
          </p>
          <button
            type="submit"
            className="w-full h-[49px] rounded-[8px] bg-[#000000] text-white flex gap-2 items-center justify-center text-md font-medium"
          >
            <span>Verify</span>
          </button>
        </form>
      </div>
      <div className="h-full w-full bg-[#EDEDED]"></div>
    </div>
  );
}
