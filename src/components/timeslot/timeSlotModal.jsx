import { useState } from "react";
import { Days } from "../../static/Days";

export default function TimeSlotModal({ isOpen, setIsOpen,setTimeSlots }) {

  const [startTime, setStartTime] = useState({
    time: "",
    isAm: "",
    endTime: "",
    startIsAm: "",
    endIsAm: "",
    day:"",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "startIsAm" || name === "endIsAm" || name === "day") {
        setStartTime({
            ...startTime,
            [name]: value,
        });
        return;
    }

    value = value.replace(/[^\d:]/g, "");
    let [hours, minutes] = value.split(":");
    if (hours && hours.length > 2) {
        hours = hours.slice(0, 2);
    }
    if (minutes && minutes.length > 2) {
        minutes = minutes.slice(0, 2);
    }
    if (parseInt(hours) > 12) hours = "12";
    if (minutes && parseInt(minutes) > 59) minutes = "59";
    if (value.length === 2 && !value.includes(":")) {
        value = `${hours}:`;
    } else {
        value = [hours, minutes].filter(Boolean).join(":");
    }
    setStartTime({
        ...startTime,
        [name]: value,
    });
};



  return (
    isOpen && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white  w-[420px] h-[270px]  rounded-[16px] ">
          <div className="flex  px-6 flex-col justify-center gap-y-4 h-full">
            <h3 className="text-2xl text-black">Add New Time Slots</h3>
            <form action="">
              <div className="mb-3" >
                <select name="day" className="border h-[44px] rounded-[12px] px-2 w-full ">
                  {
                    Days?.map((item,i)=>(
                      <option value={item} key={i} >{item}</option>
                    ))
                  }
                </select>
              </div>
              <div className="grid mb-2 gap-4 grid-cols-2">
                {/* <Input type={"hour"} /> */}
                <div>
                  <label htmlFor="" className="font-[500]  text-[14px]">
                    Start Time{" "}
                  </label>
                  <div className="border w-[180px] h-[40px] rounded-[12px] py-2">
                    <input
                      type="text"
                      name="time"
                      placeholder="00:00"
                      value={startTime.time}
                      onChange={handleChange}                   
                      className="border-r-2 w-[60%] h-full outline-none px-2 text-[#727272]"
                    />
                    <select   onChange={handleChange} name="startIsAm" className="outline-none px-2 text-[#727272]">
                      <option selected value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="font-[500]  text-[14px]">
                    End Time{" "}
                  </label>
                  <div className="border w-[180px] h-[40px] rounded-[12px] py-2">
                    <input
                      type="text"
                      name="endTime"
                      placeholder="00:00"
                      value={startTime.endTime}
                      onChange={handleChange}
                      className="border-r-2 w-[60%] h-full outline-none px-2 text-[#727272]"
                    />
                      <select name="endIsAm"   onChange={handleChange} className="outline-none px-2 text-[#727272]">
                      <option selected value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex mt-8 items-center justify-center gap-5 ">
                <button
                  type="button"
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
                    setTimeSlots(prev=>[...prev,startTime])
                  }}
                  className="w-[180px] h-[50px] rounded-[14px] bg-[#181818] text-white flex gap-2 items-center justify-center text-md font-medium"
                >
                  Yes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
