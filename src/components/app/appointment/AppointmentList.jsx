import { NavLink } from "react-router";
import { appointments } from "../../../static/Users";
import Filter from "../../global/Filter";
import { CiSearch } from "react-icons/ci";
import Pagination from "../../global/Pagination";
import { useUsers } from "../../../hooks/api/Get";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { formatDate, formatTime, formatTimeRange } from "../../../lib/helpers";

export default function AppointmentList() {
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState();
  const { loading, data, pagination } = useUsers(
    `appointments`,
    pageNo,
    search,
    startDate,
    endDate
  );
  console.log(data);

  return (
    <div className="border px-3 py-3 col-span-9 rounded-[13px] bg-white shadow-[0px_0.84px_2.52px_0px_#0000001A]">
      <div className="pb-2 flex items-center justify-between">
        <h3 className="text-[32px] font-[600] ">Appointment Management</h3>
        <Filter
          startDate={startDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
      </div>
      <div className="flex items-center mb-3 w-full p-1 px-2 bg-gray-100 rounded-[8px] overflow-hidden">
        <div className="flex items-center pl-4">
          <CiSearch className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 text-[14px] h-[40px] font-[400] bg-transparent border-none outline-none text-[#0A150F80]"
        />
        {/* <button className="rounded-[8px] bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-6 py-2">
          Search
        </button> */}
      </div>

      <div>
        <div className="relative overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <FiLoader className="animate-spin text-lg " />
            </div>
          ) : (
            <table className="w-full text-[13px] font-[400] text-left rtl:text-right text-gray-500">
              <thead className="text-[12px] font-[600] capitalize text-[#787F8C]  bg-[#F3F5F7]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Appointment Date{" "}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Appointment Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Paid
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, i) => (
                  <tr key={i} className="cursor-pointer">
                    <th
                      scope="row"
                      className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <div className="flex gap-2 items-center">
                        <img
                          src={item?.user?.profilePicture}
                          className="rounded-full h-10 w-10"
                          alt=""
                        />
                        <p className="font-[400] text-[13px]">
                          {item?.user?.name}
                        </p>
                      </div>
                    </th>
                    <td className="px-6 py-4">{item?.email}</td>
                    <td className="px-6 py-4">
                      {formatDate(new Date(item?.date))}
                    </td>
                    <td className="px-6 py-4">
                      {formatTimeRange(item?.startTime, item?.endTime)}
                    </td>
                    <td className="px-6 py-4">${item?.fee}</td>
                    <td className="px-6 py-4">
                      <NavLink
                        to={`/appointment/${item.appointmentId}`}
                        state={item}
                        className={
                          "text-[#181818] underline font-[400] text-[13px]"
                        }
                      >
                        View details
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Pagination
          currentPage={pageNo}
          totalPages={pagination?.totalPages || 1}
          onPageChange={setPageNo}
        />
      </div>
    </div>
  );
}
