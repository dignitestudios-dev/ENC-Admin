import React, { useState } from "react";

import { useFormik } from "formik";
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router";

import Input from "../../components/global/Input";
import UpdatePasswordSuccessfully from "../../components/authentication/UpdatePasswordSuccessFully";
import { useNavigate } from "react-router";
import { ChangedValues } from "../../init/authentication/LoginValues";
import { ChangedSchema } from "../../schema/authentication/LoginSchema";
import { processError } from "../../lib/utils";
import { useResetPassword } from "../../hooks/api/Post";
import { FiLoader } from "react-icons/fi";

export default function ChangePassword() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate("");
  const { loading, postData } = useResetPassword();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: ChangedValues,
      validationSchema: ChangedSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {   
        const data = {
          password: values?.password,
        };

        try {
          const res = await postData(
            "auth/updatePassword",
            false,
            null,
            data,
            ""
          );
          if (res?.success) {
            setIsOpen(true); 
          } else {
            processError("Failed to update password. Please try again.");
          }
        } catch (error) {
          console.error("Error while updating password", error);
          processError("An error occurred while updating password.");
        }
      },
    });
  return (
    <div className="w-full h-full  md:grid grid-cols-2 items-center   rounded-[19px] bg-white">
      <div className="flex justify-center px-6 md:px-0 flex-col items-center">
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
            <span>Update</span>
                  {loading && <FiLoader className="animate-spin text-lg " />}
          </button>
        </form>
      </div>
      <div className="h-full w-full hidden md:flex bg-[#EDEDED]"></div>

      <UpdatePasswordSuccessfully isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
