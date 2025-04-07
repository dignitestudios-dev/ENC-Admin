import { NavLink, useLocation } from "react-router";
import { sidebarData } from "../../static/Sidebar";
import { Logo, logoutIcon } from "../../assets/export";
import { IoMdClose } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import LogOutModal from "../authentication/LogOutModal";
import { useState } from "react";

const Sidebaar = ({ toggleModal,setIsOpen }) => {
  const location = useLocation();
  
  console.log(location, "location");

  return (
    <div className="w-full h-full overflow-y-auto px-5 py-3 flex flex-col gap-3 ">
      <div className="flex justify-end px-4" >
        <button
          onClick={() =>{
            toggleModal()
            alert("hi")
            }}
          className="lg:hidden block"
        >
          <IoMdClose className="text-2xl" color="white" />
        </button>
      </div>
      <div className="flex justify-start mb-8">
        <img
          src={Logo}
          loading="lazy"
          alt="logo-organization"
          className="w-[87px] h-[94px]"
        />
      </div>
      {sidebarData?.map((sidebar) => {
        return (
          <NavLink 
            key={sidebar?.link}
            className={({ isActive }) =>
              isActive
                ? "text-[12px] border w-full h-[40px] flex -leading-[0.5px] items-center rounded-[4px] gap-2 px-3 justify-start border-[#181818] bg-[#181818] text-white font-medium "
                : "text-[12px] w-full h-[40px] flex items-center -leading-[0.5px] gap-2 px-3 justify-start rounded-[4px] font-medium  text-[#181818]"
            }
            to={sidebar?.link}
          >
            <img
              src={
                location?.pathname == sidebar.link
                  ? sidebar?.whiteIcon
                  : sidebar?.icon
              }
              className="w-4 "
              alt=""
            />
            <span>{sidebar?.title}</span>
          </NavLink>
        );
      })}
        <NavLink onClick={()=>setIsOpen(true)} className={"text-sm w-full h-12 flex items-center gap-5 px-3 justify-start rounded-[4px] font-medium  text-[#181818]"}>
          <img src={logoutIcon} className="w-4 " alt="loguticon" /> Logout
          </NavLink>

    </div>
  );
};

export default Sidebaar;
