import { useState, useEffect } from "react";
import {
  format,
  subMonths,
  addMonths,
  addYears,
  isEqual,
  getDaysInMonth,
  getDay,
} from "date-fns";
import { FaChevronRight } from "react-icons/fa6";
import { datePickerCalendar } from "../../assets/export";

export default function DatePicker({ selectDate, onDateChange }) {
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [dayCount, setDayCount] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    const parsedDate = new Date(selectedDate);
    if (!isNaN(parsedDate)) {
      setSelectedDate(parsedDate);
    }
  }, []);

  const [type, setType] = useState("date");

  const increment = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const isToday = (date) =>
    isEqual(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
      selectedDate
    );

  const setDateValue = (date) => () => {
    const newDate = new Date(
      datepickerHeaderDate.getFullYear(),
      datepickerHeaderDate.getMonth(),
      date
    );

    setSelectedDate(newDate);
    onDateChange(newDate);
    setShowDatepicker(false);
  };

  const getDayCount = (date) => {
    let daysInMonth = getDaysInMonth(date);
    let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));

    // Adjust the calculation to align Sundays properly
    let blankdaysArray = Array.from(
      { length: dayOfWeek === 0 ? 6 : dayOfWeek - 1 },
      (_, i) => i + 1
    );
    let daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const isSelectedMonth = (month) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate
    );

  const setMonthValue = (month) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate()
      )
    );
    setType("date");
  };

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);
  const showMonthPicker = () => setType("month");

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  return (
    <div>
      <div className="w-full lg:w-44">
        <div className="relative">
          <input type="hidden" name="date" />
          <input
            type="text"
            readOnly
            className="cursor-pointer w-full pl-2 pr-6  leading-none bg-white border border-color text-gray-900 text-sm rounded-[12px]  mt-1  block h-[50px] focus:outline-[#232423]"
            placeholder="Select date"
            value={format(selectedDate, "yyyy-MM-dd")}
            onClick={toggleDatepicker}
          />
          <div
            className="cursor-pointer absolute top-0 right-0 px-3 py-3"
            onClick={toggleDatepicker}
          >
            <img src={datePickerCalendar} className="w-5" alt="" />
          </div>
          {showDatepicker && (
            <div
              className="bg-white mt-12 rounded-lg shadow p-4 absolute top-2 right-0"
              style={{ width: "17rem", zIndex: "99999999" }}
            >
              <div className="flex items-center mb-2">
                {type === "date" && (
                  <div
                    onClick={showMonthPicker}
                    className=" flex items-center text-[20px] gap-2 font-bold"
                  >
                    <div className="text-center">
                      {format(datepickerHeaderDate, "MMMM")}{" "}
                      {format(datepickerHeaderDate, "yyyy")}
                    </div>
                    <div>
                      <button
                        type="button"
                        className="mt-2"
                        onClick={increment}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {type === "date" && (
                <>
                  <div className="flex flex-wrap mb-3 -mx-1">
                    {DAYS.map((day, i) => (
                      <div key={i} style={{ width: "14.26%" }} className="px-1">
                        <div className="text-gray-800 font-normal text-[#3C3C4399] text-center text-[12px]">
                          {day}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap -mx-1">
                    {blankDays.map((_, i) => (
                      <div
                        key={i}
                        style={{ width: "14.26%" }}
                        className="text-center border p-1 border-transparent text-sm"
                      ></div>
                    ))}
                    {dayCount.map((d, i) => {
                      const dateToCheck = new Date(
                        datepickerHeaderDate.getFullYear(),
                        datepickerHeaderDate.getMonth(),
                        d
                      );

                      // Get the current date without time
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // Reset time to midnight

                      const isPastDate = dateToCheck < today;

                      return (
                        <div
                          key={i}
                          style={{ width: "14.26%" }}
                          className="px-1 mb-2"
                        >
                          <button
                            // disabled={isPastDate}
                            onClick={setDateValue(d)}
                            className={`cursor-pointer text-center text-sm leading-none rounded-full transition ease-in-out duration-100 
          ${
            isToday(d)
              ? "text-[white] bg-[#181818] w-6 shadow-2xl flex items-center justify-center h-6 rounded-full text-xs "
              : "hover:text-[#4f4f4f]"
          } 
          ${getDay(dateToCheck) === 0 ? "text-red-500" : ""} 
          ${isPastDate ? " cursor-not-allowed" : ""}
        `}
                          >
                            {d}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {type === "month" && (
                <div className="flex flex-wrap -mx-1">
                  {Array(12)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        onClick={setMonthValue(i)}
                        style={{ width: "25%" }}
                      >
                        <div
                          className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                            isSelectedMonth(i)
                              ? "bg-blue-500 text-white"
                              : "text-gray-700 hover:bg-blue-200"
                          }`}
                        >
                          {format(
                            new Date(
                              datepickerHeaderDate.getFullYear(),
                              i,
                              datepickerHeaderDate.getDate()
                            ),
                            "MMM"
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
