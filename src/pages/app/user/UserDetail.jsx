import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";

export default function UserDetail() {
  const navigate = useNavigate("");
  const loc = useLocation("");
  const { state } = loc;
  return (
    <div className="max-w-6xl mx-auto bg-[#FFFFFF] rounded-[16px] p-6">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <FaArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">User Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Details Card */}
        <div className="lg:col-span-2 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">User Details</h2>

          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full mr-6">
              <img
                src={state?.profilePicture}
                className="w-full h-full rounded-full"
                alt={state?.profilePicture}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 flex-1">
              <div>
                <p className="text-gray-500 text-sm">FULL NAME</p>
                <p>{state?.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">EMAIL ADDRESS</p>
                <p>{state?.email}</p>
              </div>
            </div>
          </div>
          {/* 
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Appointment Summary</h3>

            <ul className="space-y-6">
              <li className="flex">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">
                    What is the primary reason for your appointment?
                  </p>
                  <p className="text-gray-700">
                    Career Coaching & Professional Development
                  </p>
                </div>
              </li>

              <li className="flex border-t border-gray-200 pt-6">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">
                    Do you require any special accommodations for this session?
                  </p>
                  <p className="text-gray-700">
                    Yes, I need closed captioning during the meeting.
                  </p>
                </div>
              </li>

              <li className="flex border-t border-gray-200 pt-6">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">
                    Have you attended an ENC session before?
                  </p>
                  <p className="text-gray-700">No, this is my first session</p>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}
