import { useState } from "react";
import { Days } from "../../static/Days";
import { useSetAvaliability } from "../../hooks/api/Post";
import { slotValues } from "../../init/app/SloteValues";
import { slotSchema } from "../../schema/app/slotSchema";
import { useFormik } from "formik";
import { FiLoader } from "react-icons/fi";

export default function TimeSlotModal({ isOpen, setIsOpen, setTimeSlots,reload,setReload }) {
  const { loading, postData } = useSetAvaliability();
  const {
    values,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: slotValues,
    validationSchema: slotSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const { day, time, startIsAm, endTime, endIsAm } = values;
      const convertTo24Hour = (timeStr, amPm) => {
        if (!timeStr) return { hours: 0, minutes: 0 }; // Add a fallback if timeStr is undefined or empty

        let [hours, minutes] = timeStr.split(":").map(Number);

        // Ensure hours and minutes are valid numbers
        if (isNaN(hours)) hours = 0;
        if (isNaN(minutes)) minutes = 0;

        if (amPm === "PM" && hours < 12) hours += 12;
        if (amPm === "AM" && hours === 12) hours = 0;

        return { hours, minutes };
      };

      const { hours: startH, minutes: startM } = convertTo24Hour(
        time,
        startIsAm
      );
      const { hours: endH, minutes: endM } = convertTo24Hour(endTime, endIsAm);
      const today = new Date();
      const buildISOTime = (baseDate, h, m) => {
        const date = new Date(baseDate);
        date.setHours(h);
        date.setMinutes(m);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.toISOString();
      };

      const payload = {
        day,
        startTime: buildISOTime(today, startH, startM),
        endTime: buildISOTime(today, endH, endM),
      };
      const res = await postData("availabilities", false, null, payload);
      console.log(res);
      if (res.success) {
        resetForm();
        setReload(!reload)
        setIsOpen(false);
      }
    },
  });

  const handleChangeTimeSlot = (e) => {
    const { name, value } = e.target;

    // Handle AM/PM or day directly
    if (name === "startIsAm" || name === "endIsAm" || name === "day") {
      setFieldValue(name, value);
      return;
    }

    // Time formatting logic
    let cleanValue = value.replace(/[^\d:]/g, "");
    let [hours, minutes] = cleanValue.split(":");

    if (hours && hours.length > 2) {
      hours = hours.slice(0, 2);
    }
    if (minutes && minutes.length > 2) {
      minutes = minutes.slice(0, 2);
    }

    if (parseInt(hours) > 12) hours = "12";
    if (minutes && parseInt(minutes) > 59) minutes = "59";

    if (cleanValue.length === 2 && !cleanValue.includes(":")) {
      cleanValue = `${hours}:`;
    } else {
      cleanValue = [hours, minutes].filter(Boolean).join(":");
    }

    setFieldValue(name, cleanValue);
  };

  return (
    isOpen && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white  w-[420px] h-[270px]  rounded-[16px] ">
          <div className="flex  px-6 flex-col justify-center gap-y-4 h-full">
            <h3 className="text-2xl text-black">Add New Time Slots</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className="mb-3">
                <select
                  name="day"
                  value={values.day}
                  onChange={handleChangeTimeSlot}
                  onBlur={handleBlur}
                  className={`border h-[44px] rounded-[12px] px-2 w-full ${
                    touched.day && errors.day
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="" disabled>
                    Select a day
                  </option>
                  {Days?.map((item, i) => (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid mb-2 gap-4 grid-cols-2">
                <div
                  className={`border w-[180px] h-[40px] rounded-[12px] py-2 flex ${
                    touched.startTime && errors.startTime
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="text"
                    name="startTime"
                    placeholder="00:00"
                    value={values.startTime}
                    onChange={handleChangeTimeSlot}
                    onBlur={handleBlur}
                    className="border-r-2 w-[60%] h-full outline-none px-2 text-[#727272]"
                  />
                  <select
                    name="startIsAm"
                    value={values.startIsAm}
                    onChange={handleChangeTimeSlot}
                    onBlur={handleBlur}
                    className="outline-none px-2 text-[#727272]"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>

                <div
                  className={`border w-[180px] h-[40px] rounded-[12px] py-2 flex ${
                    touched.endTime && errors.endTime
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="text"
                    name="endTime"
                    placeholder="00:00"
                    value={values.endTime}
                    onChange={handleChangeTimeSlot}
                    onBlur={handleBlur}
                    className="border-r-2 w-[60%] h-full outline-none px-2 text-[#727272]"
                  />
                  <select
                    name="endIsAm"
                    value={values.endIsAm}
                    onChange={handleChangeTimeSlot}
                    onBlur={handleBlur}
                    className="outline-none px-2 text-[#727272]"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
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
                  type="submit"
                  className="w-[180px] h-[50px] rounded-[14px] bg-[#181818] text-white flex gap-2 items-center justify-center text-md font-medium"
                >
                  Yes{" "}
                  {loading && <FiLoader className="animate-spin text-lg " />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
