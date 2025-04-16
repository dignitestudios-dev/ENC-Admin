import React, { useState } from "react";
import Input from "../../components/global/Input";
import { passwordReset } from "../../assets/export";
import UpdatePasswordSuccessfully from "../../components/authentication/UpdatePasswordSuccessFully";
import { useFormik } from "formik";
import { updatePasswordValues } from "../../init/authentication/LoginValues";
import { UpdatePasswordSchema } from "../../schema/authentication/LoginSchema";
import { useResetPassword } from "../../hooks/api/Post";
import { processError } from "../../lib/utils";
import { PiSpinnerBold } from "react-icons/pi";

export default function UpdatePassword() {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, postData } = useResetPassword();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: updatePasswordValues,
      validationSchema: UpdatePasswordSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = {
          password: values?.password,
          newPassword: values?.confirmpassword,
        };
        try {
          const res = await postData(
            "/auth/changePassword",
            false,
            null,
            data,
            ""
          );
          if (res?.success) {
            setIsOpen(!isOpen);
          }
        } catch (error) {
          console.error("Error while updating password", error);
          processError("An error occurred while updating password.");
        }
      },
    });
  return (
    <div className="mx-auto bg-[#FFFFFF] rounded-[16px] px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-between">
        <div className="lg:w-[80%]">
          <h3 className="text-[#202224] font-[600] text-[32px] ">
            Update Password
          </h3>
          <p className="text-[16px] font-[400] text-[#565656]">
            Update your Password
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="flex flex-col gap-4 mt-8"
          >
            <Input
              type={"password"}
              name={"password"}
              text={"current password"}
              holder={"Enter password here"}
              error={errors.password}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched?.password}
              value={values.password}
            />
            <Input
              type={"password"}
              text={"new password"}
              holder={"Enter new password here"}
              name={"newPassword"}
              error={errors.newPassword}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched?.newPassword}
              value={values.newPassword}
            />
            <Input
              type={"password"}
              name={"confirmpassword"}
              error={errors.confirmpassword}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched?.confirmpassword}
              value={values.confirmpassword}
              text={"confirm password"}
              holder={"Re enter password here"}
            />
            <button
              type="submit"
              className="w-full h-[49px] rounded-[8px] bg-[#000000] text-white flex gap-2 items-center justify-center text-md font-medium"
            >
              <span>Update</span>
              {loading && <PiSpinnerBold className="animate-spin text-lg " />}
            </button>
          </form>
        </div>
        <div className="w-full">
          <img
            src={passwordReset}
            alt="passwordReset"
            className="object-contain w-full"
          />
        </div>
      </div>

      <UpdatePasswordSuccessfully
        update={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
