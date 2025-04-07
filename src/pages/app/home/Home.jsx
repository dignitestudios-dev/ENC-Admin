// import { NavLink } from "react-router";
import RevenueChart from "../../../components/app/dashboard/Graph";
import Insight from "../../../components/app/dashboard/Insight";
// import { appointments, newUsers } from "../../../static/Users";

const Home = () => {
  return (
    <div>
      <h3 className="font-[600] text-[32px] mb-6 -tracking-[0.11px]">Dashboard</h3>
      <Insight />
      <RevenueChart/>
      {/* <div className="grid gap-6 lg:grid-cols-12 mt-10 mb-10">
        <div className="border col-span-3 px-3 py-5 bg-white rounded-[13px] shadow-[0px_0.84px_2.52px_0px_#0000001A]">
          <div>
            <h3 className="text-[16px] font-[600] ">New Users</h3>
          </div>
          <div className="space-y-0">
            {newUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-4 border-b last:border-0"
              >
                <div className="h-10 w-10">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border px-3 py-5 col-span-9 rounded-[13px] bg-white shadow-[0px_0.84px_2.52px_0px_#0000001A]">
          <div className="pb-2">
            <h3 className="text-[16px] font-[600] ">Upcoming Appointments</h3>
          </div>
          <div className="mt-4">
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
                      
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((item, i) => (
                    <tr
                      key={i}
                    >
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
                      <td className="px-6 py-4">
                        <NavLink to={`/user/${i}`} className={"text-[#181818] underline font-[400] text-[13px]"} >View details</NavLink>
                      </td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
