import React from "react";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useLogout } from "../../hooks/api/Post";
const LogOutModal = ({isOpen, setIsOpen}) => {
  const navigate = useNavigate("");
  const {loading,postData}=useLogout()
  return (
    isOpen && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white  w-[420px] h-[280px]  rounded-[16px] ">
          <div className="flex items-center flex-col justify-center gap-y-4 h-full">
            <div className="flex flex-col gap-y-2 items-center">
              <IoLogOut size={60} />
              <h3 className="text-2xl text-black">Log Out</h3>
            </div>
            <p className="text-center text-wrap text-[#565656]">
              Are you sure you want to logout?
            </p>
            <div className="flex items-center justify-center gap-5 ">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="bg-[#ECECEC] text-black text-sm px-4 py-1 rounded-[14px] w-[180px] h-[50px]"
              >
                No
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  postData()
                  navigate("auth/logout");
                }}
                className="w-[180px] h-[50px] rounded-[14px] bg-[#181818] text-white flex gap-2 items-center justify-center text-md font-medium"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LogOutModal;
