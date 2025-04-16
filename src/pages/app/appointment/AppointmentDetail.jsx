import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import { formatDate, formatTime } from "../../../lib/helpers";

export default function AppointmentDetail() {
  const navigate = useNavigate("");
  const loc = useLocation("");
  const { state } = loc;
  console.log(state, "locations");

  return (
    <div className="max-w-6xl mx-auto bg-[#FFFFFF] rounded-[16px] p-6">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <FaArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Appointment Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">User Details</h2>

          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full mr-6">
              <img src={state?.user?.profilePicture} className="w-full h-full rounded-full" alt={state?.profilePicture} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 flex-1">
              <div>
                <p className="text-gray-500 font-[600] text-sm">FULL NAME</p>
                <p className="text-[#181818] font-[400] text-sm">
                  {state?.name}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-[600] text-sm">
                  EMAIL ADDRESS
                </p>
                <p className="text-[#181818] font-[400] text-sm">
                  {state?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Appointment Summary</h3>
            <ul className="space-y-6">
              <li className="flex">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">
                    What is the primary reason for your appointment?
                  </p>
                  <p className="text-gray-700">{state?.reason}</p>
                </div>
              </li>

              <li className="flex border-t border-gray-200 pt-6">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">
                    Do you require any special accommodations for this session?
                  </p>
                  {state?.accomodation.map((item,i) => (
                    <p key={i} className="text-gray-700">
                   {item}
                    </p>
                  ))}
                </div>
              </li>

              <li className="flex border-t border-gray-200 pt-6">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">
                    Have you attended an ENC session before?
                  </p>
                  <p className="text-gray-700">{state?.attendedBefore}</p>
                </div>
              </li>

              <li className="flex border-t border-gray-200 pt-6">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">
                    What specific goals or topics would you like to discuss?
                    (optional)
                  </p>
                  <p className="text-gray-700">
                  {state?.specificGoals}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-4 border border-gray-200 h-[100%] max-h-[420px] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Appointment Detail</h2>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between py-2">
              <p>ID</p>
              <p className="font-medium">{state?.appointmentId}</p>
            </div>

            <div className="flex justify-between py-2 border-t border-gray-200">
              <p>Appointment Date</p>
              <p className="font-medium">{formatDate(new Date(state?.date))}</p>
            </div>

            <div className="flex justify-between py-2 border-t border-gray-200">
              <p>Appointment Time</p>
              <p className="font-medium">{formatTime(state?.startTime)}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Total Payment</h3>

          <div className="space-y-4">
            <div className="flex justify-between py-2">
              <p>Subtotal</p>
              <p className="font-medium">${state?.fee}</p>
            </div>

            <div className="flex justify-between py-2 border-t border-gray-200">
              <p>Total</p>
              <p className="font-medium">${state?.fee}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
