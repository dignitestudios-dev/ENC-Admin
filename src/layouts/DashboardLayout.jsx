import { Outlet } from "react-router";
import { useEffect, useRef, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import Navbar from "../components/layout/Navbar";
import Sidebaar from "../components/layout/Sidebaar";
// import LogOutModal from "../components/authentication/LogOutModal";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import LogOutModal from "../components/authentication/LogOutModal";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    if (!navigator.onLine) {
      setOpenNoInternet(true);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex justify-start bg-[#F5F7F7]  items-start overflow-hidden">     
      <div
        onClick={toggleModal}
        className={`w-screen h-screen fixed  top-0 left-0 transition-all duration-500  ${
          isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static  z-50 lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
      >
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 transition-all duration-200  ${
            isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:static backdrop-blur-[50px] w-[60%] z-50 lg:z-auto lg:w-60 xl:w-72 flex flex-col gap-3 items-center  justify-start py-0 h-full
 bg-[#FFFFFF]`}
        >
          <Sidebaar setIsOpen={setIsLog} />
        </div>
      </div>

      <div className="w-full relative h-[calc(100%-4.5rem)] lg:w-[calc(100%-15rem)] xl:w-[calc(100%-18rem)]   ">
        <div className="sticky h-[90px] rounded-2xl rounded-tl-none rounded-bl-none backdrop-blur-[50px] bg-[#FFFFFF] flex items-center justify-between lg:justify-end z-20">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden block"
          >
            <HiOutlineMenuAlt2 className="text-2xl ml-2" color="white" />
          </button>
          <Navbar />
        </div>
        <div className="p-4  overflow-auto h-full ">
          <NoInternetModal isOpen={openNoInternet} />     
            <LogOutModal isOpen={isLog} setIsOpen={setIsLog} />
          <Outlet />
        </div>
      </div>
    </div>
   
  );
};

export default DashboardLayout;
