import { FaXmark } from "react-icons/fa6";
import { filterIcon } from "../../assets/export";
import DatePicker from "./DatePicker";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={()=>setIsOpen(!isOpen)} >
        {" "}
        <img className="w-20" src={filterIcon} alt="filterIcon" />{" "}
      </button>
      {isOpen && (
        <div className="bg-[#FFFFFF] absolute right-0 z-10 w-[400px] rounded-[13px] shadow-[2px_10px_27px_0px_#00000012] px-3 py-3 ">
          <div className="flex justify-between border-b">
            <h3>Filter</h3>
            <button onClick={()=>setIsOpen(!isOpen)} >
              <FaXmark />
            </button>
          </div>
          <div className="grid grid-cols-2 mt-3 gap-2">
            <div>
              <div>
                <label htmlFor="" className="font-[500] text-[14px] ">
                  Start Date
                </label>
                <DatePicker />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="" className="font-[500] text-[14px] ">
                  End Date
                </label>
                <DatePicker />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-3">
            <button className="bg-[#DCDCDC] text-[#6A6A6A] text-[16px] font-[500] rounded-[8px] w-full h-[50px]">
              Clear
            </button>
            <button className="bg-[#181818] text-white rounded-[8px] w-full h-[50px]">
              Apply
            </button>
          </div>
        </div>
      )}
  
    </div>
  );
}
