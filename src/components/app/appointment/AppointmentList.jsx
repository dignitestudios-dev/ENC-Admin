import { NavLink} from "react-router";
import { appointments } from "../../../static/Users";
import Filter from "../../global/Filter";
import { CiSearch } from "react-icons/ci";
import Pagination from "../../global/Pagination";

export default function AppointmentList() {
  return (
    <div className="border px-3 py-3 col-span-9 rounded-[13px] bg-white shadow-[0px_0.84px_2.52px_0px_#0000001A]">
      <div className="pb-2 flex items-center justify-between">
        <h3 className="text-[32px] font-[600] ">Appointment Management</h3>
        <Filter />
      </div>
      <div className="flex items-center mb-3 w-full p-1 px-2 bg-gray-100 rounded-[8px] overflow-hidden">
        <div className="flex items-center pl-4">
          <CiSearch className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="flex-1 py-2 px-3 bg-transparent border-none outline-none text-gray-700"
        />
        <button className="rounded-[8px] bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-6 py-2">
          Search
        </button>
      </div>

      <div>
        <div className="relative overflow-x-auto">
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
              {appointments?.map((item, i) => (
                <tr key={i} className="cursor-pointer"   >
                  <th
                    scope="row"
                    className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex gap-2 items-center">
                      <img src={item?.avatar} alt="" />
                      <p>{item?.name}</p>
                    </div>
                  </th>
                  <td className="px-6 py-4">{item?.email}</td>
                  <td className="px-6 py-4">{item?.date}</td>
                  <td className="px-6 py-4">{item?.time}</td>
                  <td className="px-6 py-4">$24</td>
                  <td className="px-6 py-4">
                    <NavLink
                      to={`/appointment/${i}`}
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
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Pagination />
      </div>
    </div>
  );
}
