import { calendar, date, user } from "../../../assets/export";

export default function Insight({ isInsights }) {
  console.log(isInsights, "insights");

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex items-center gap-2 p-4 bg-[#FFFFFF] rounded-[12px] shadow-sm">
        <div>
          <img src={user} className="w-10" alt="Total Users" />
        </div>
        <div>
          <p className="text-[16px] font-[600]">
            {isInsights?.totalUsers || 0}
          </p>
          <p className="font-[400] text-[#0A150F80] text-[13px]">Total Users</p>
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 bg-[#FFFFFF] rounded-[12px] shadow-sm">
        <div>
          <img src={calendar} className="w-10" alt="Total Appointments" />
        </div>
        <div>
          <p className="text-[16px] font-[600]">
            {isInsights?.totalAppointments || 0}
          </p>
          <p className="font-[400] text-[#0A150F80] text-[13px]">
            Total Appointments
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 bg-[#FFFFFF] rounded-[12px] shadow-sm">
        <div>
          <img src={date} className="w-10" alt="Earning" />
        </div>
        <div>
          <p className="text-[16px] font-[600]">${isInsights?.earnings || 0}</p>
          <p className="font-[400] text-[#0A150F80] text-[13px]">Earning</p>
        </div>
      </div>
    </div>
  );
}
