import React from "react";
import useApp, { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router";

export default function ProfileDropdown({setIsLogout,isLogout}) {
  return (
    <div>
      <div>
        <NavLink to={'/updatePassword'} className="text-white text-[14px] font-[500]">
          Change Password
        </NavLink>
      </div>
      <div>
        <button onClick={()=>setIsLogout(!isLogout)} className="text-[#FF4040] mt-2 text-[14px] font-[500]">
          Logout
        </button>
      </div>
    </div>
  );
}
