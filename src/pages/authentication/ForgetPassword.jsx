import { useFormik } from "formik";
import React from "react";
import { forgetValues } from "../../init/authentication/LoginValues";
import { forgotSchema } from "../../schema/authentication/LoginSchema";
import { FaArrowLeft } from "react-icons/fa6";
import Input from "../../components/global/Input";
import { useNavigate } from "react-router";
import { useForgetPassword } from "../../hooks/api/Post";
import { FiLoader } from "react-icons/fi";
export default function ForgetPassword() {
  const navigate=useNavigate("");
  const { forgetLoader, postData } = useForgetPassword();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
  useFormik({
    initialValues: forgetValues,
    validationSchema: forgotSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      const data = {
        email: values?.email,
        role:"admin"
      };
      postData("auth/forgot", false, null, data, "");
    },
  });
   


  return (
    <div className="w-full h-full  grid  md:grid-cols-2    rounded-[19px] bg-white">
      <div className="flex justify-center px-6 md:px-0 flex-col items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="w-full md:w-[393px]  mt-5 flex flex-col justify-start items-start gap-4"
        >
          <div className="text-start">
            <button type="button" onClick={()=>navigate(-1)} >
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-[36px] mt-2 font-bold leading-[48px] capitalize">
              forgot password
            </h2>
            <p className="text-[14px] font-normal text-start mt-2 leading-[27px] text-[#868686]">
              Enter your registered email address to recover password
            </p>
          </div>

          <Input
            text={"email address"}
            name={"email"}
            type={"email"}
            holder={"chris.tom@gmail.com"}
            value={values.email}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.email}
            touched={touched?.email}
          />
          <button
            type="submit"
            className="w-full h-[49px] rounded-[8px] bg-[#000000] text-white flex gap-2 items-center justify-center text-md font-medium"
          >
            <span>Next</span>
             {forgetLoader && <FiLoader className="animate-spin text-lg " />}
          </button>
        </form>
      </div>
      <div className="h-full w-full hidden md:flex bg-[#EDEDED]"></div>
    </div>
  );
}
