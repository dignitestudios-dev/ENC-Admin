import React, { useState } from "react";
import Input from "../../components/global/Input";
import { passwordReset } from "../../assets/export";
import UpdatePasswordSuccessfully from "../../components/authentication/UpdatePasswordSuccessFully";

export default function UpdatePassword() {
    const [isOpen,setIsOpen]=useState(false);
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
          <form onSubmit={(e)=>{
            e.preventDefault();
            setIsOpen(!isOpen)
          }} className="flex flex-col gap-4 mt-8">
            <Input
              type={"password"}
              name={"password"}
              text={"current password"}
              holder={"Enter password here"}
            />
            <Input
              type={"password"}
              name={"new_password"}
              text={"new password"}
              holder={"Enter new password here"}
            />
            <Input
              type={"password"}
              name={"confirm_password"}
              text={"confirm password"}
              holder={"Re enter password here"}
            />
            <button
              type="submit"
              className="w-full h-[49px] rounded-[8px] bg-[#000000] text-white flex gap-2 items-center justify-center text-md font-medium"
            >
              <span>Update</span>
              {/* {loading && <FiLoader className="animate-spin text-lg " />} */}
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

      <UpdatePasswordSuccessfully update={true} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
