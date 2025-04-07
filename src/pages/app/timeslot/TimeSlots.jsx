import React, { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import TimeSlotModal from "../../../components/timeslot/timeSlotModal";
import { CiTrash } from "react-icons/ci";
import { DollarIcon } from "../../../assets/export";

export default function TimeSlots() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  console.log(timeSlots);
  return (
    <div className="mx-auto bg-[#FFFFFF] h-full rounded-[16px] px-6 py-6">
      <div className="md:w-[400px]">
        <h3 className="text-[#202224] font-[600] text-[32px] ">
          Time Slots Management
        </h3>
        <p className="text-[16px] mt-1 font-[400] text-[#565656]">
          Update your Time slots and Price
        </p>
        <div className="mt-4">
          <p className="text-[#181818] font-[500] text-[14px]">
            Add time Slots
          </p>
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer flex items-center justify-center underline  font-[400] text-[12px] hover:border-dashed h-[105px] border mt-2 border-[#BEBEBE] rounded-[12px]"
          >
            + Add New Slots
          </div>
        </div>
        {timeSlots.length > 0 && (
          <div className="h-[31px] w-full text-[12px] font-[400] flex items-center justify-between px-2 mt-6 rounded-[8px] bg-[#D9D9D9]">
            <p>09:00 AM - To 10:00 AM</p>
            <button>
              <CiTrash />
            </button>
          </div>
        )}

        <div className="mt-3">
          <label htmlFor="" className="text-[#181818] font-[500] text-[14px]">
            Slot Price
          </label>
          <div className="flex items-center mb-3 w-full p-1 px-2 border mt-2 rounded-[12px] overflow-hidden">
            <div className="flex items-center pl-1 font-[400]">
             <img src={DollarIcon}  alt="dollar" className=" h-3" />
            </div>
            <input
              type="text"
              className="flex-1  h-[40px] !rounded-[12px] px-3  bg-transparent border-none outline-none text-gray-700"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-[49px] rounded-[8px] bg-[#000000] text-white flex gap-2 items-center justify-center text-md font-medium"
        >
          <span>Save</span>
          {/* {loading && <FiLoader className="animate-spin text-lg " />} */}
        </button>
        <TimeSlotModal
          isOpen={isOpen}
          setTimeSlots={setTimeSlots}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
}
