import { useState } from "react";
import Filter from "../../global/Filter";
import { CiSearch } from "react-icons/ci";
import Pagination from "../../global/Pagination";
import { NavLink } from "react-router";
import { useUsers } from "../../../hooks/api/Get";
import { FiLoader } from "react-icons/fi";
import { formatDate } from "../../../lib/helpers";

export default function ContactList() {
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { loading, data, pagination } = useUsers(
    `landing/contact`,
    pageNo,
    search,
    startDate,
    endDate
  );

  console.log(data, "daatacines");

  return (
    <div className="border px-3 py-3 col-span-9 rounded-[13px] bg-white shadow-[0px_0.84px_2.52px_0px_#0000001A]">
      <div className="pb-1 flex items-center justify-between">
        <h3 className="text-[32px] font-[600] ">Users Management</h3>
        <Filter
          startDate={startDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
      </div>
      <div className="flex items-center mb-3 w-full p-1 px-2 bg-[#F5F7F7] rounded-[8px] overflow-hidden">
        <div className="flex items-center pl-1">
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

      <div className="relative overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <FiLoader className="animate-spin text-lg " />
          </div>
        ) : (
          <table className="w-full text-[13px] font-[400] text-left text-[#787F8C]">
            <thead className="text-[12px] font-[600] capitalize text-[#787F8C] bg-[#F3F5F7]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Email Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="text-[#181818]">
              {data?.map((item, i) => (
                <tr key={i}>
                  <th scope="row" className="px-3 py-4 whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      <p className="font-[400] text-[13px]">
                        {item?.firstName + " " + item?.lastName}
                      </p>
                    </div>
                  </th>
                  <td className="px-6 py-4">{item?.phone}</td>
                  <td className="px-6 py-4">{item?.email}</td>
                  <td className="px-6 py-4">{item?.message}</td>
                  <td className="px-6 py-4">
                    {formatDate(new Date(item?.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex w-full justify-end mt-4">
        <Pagination
          currentPage={pageNo}
          totalPages={pagination?.totalPages || 1}
          onPageChange={setPageNo}
        />
      </div>
    </div>
  );
}
