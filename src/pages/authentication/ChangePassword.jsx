import React, { useState } from "react";

import { useFormik } from "formik";
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router";

import Input from "../../components/global/Input";
import UpdatePasswordSuccessfully from "../../components/authentication/UpdatePasswordSuccessFully";
import { useNavigate } from "react-router";
import { ChangedValues } from "../../init/authentication/LoginValues";
import { ChangedSchema } from "../../schema/authentication/LoginSchema";

export default function ChangePassword() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate("");
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: ChangedValues,
      validationSchema: ChangedSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        // navigate("/auth/login");
        setIsOpen(true);
        const data = {};
      },
    });
  return (
    <div className="w-full h-full  grid grid-cols-2   rounded-[19px] bg-white">
      <div className="flex justify-center flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4"
        >
          <div className="text-start">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-[36px] mt-2 font-bold leading-[48px] capitalize">
              reset password
            </h2>
            <p className="text-[14px] font-normal text-start mt-2 leading-[27px] text-[#868686]">
              Set new password
            </p>
          </div>
          <Input
            text={"new password"}
            name={"password"}
            type={"password"}
            holder={"*****************"}
            value={values.password}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.password}
            touched={touched?.password}
          />
          <Input
            text={"re-type password"}
            name={"confirmpassword"}
            type={"password"}
            holder={"*****************"}
            value={values.confirmpassword}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.confirmpassword}
            touched={touched?.confirmpassword}
          />
          <button
            type="submit"
            className="w-full h-[49px] rounded-[10px] bg-[#000000] text-white flex gap-2 items-center justify-center text-md font-medium"
          >
            <span>Change Password</span>
          </button>
        </form>
      </div>
      <div className="h-full w-full bg-[#EDEDED]"></div>

      <UpdatePasswordSuccessfully isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
