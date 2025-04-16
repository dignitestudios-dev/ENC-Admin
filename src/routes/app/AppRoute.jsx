import Appointment from "../../pages/app/appointment/Appointment";
import AppointmentDetail from "../../pages/app/appointment/AppointmentDetail";
import Contact from "../../pages/app/Contact/Contacts";
import Home from "../../pages/app/home/Home";
import TimeSlots from "../../pages/app/timeslot/TimeSlots";
import User from "../../pages/app/user/User";
import UserDetail from "../../pages/app/user/UserDetail";
import UpdatePassword from "../../pages/authentication/UpdatePassword";


export const AppRoute = [
  {
    url: "dashboard",
    page: <Home />,
    name: "Dashboard",
    isPublic: true,
  },
  {
    url: "users",
    page: <User />,
    name: "users    ",
    isPublic: true,
  },
  {
    url: "user/:id",
    page: <UserDetail />,
    name: "users    ",
    isPublic: true,
  },
  {
    url: "appointments",
    page: <Appointment />,
    name: "Appointment",
    isPublic: true,
  },
  {
    url: "timeslot",
    page: <TimeSlots />,
    name: "timeslot",
    isPublic: true,
  },
  {
    url: "appointment/:id",
    page: <AppointmentDetail />,
    name: "Appointment",
    isPublic: true,
  },
  {
    url: "update-password",
    page: <UpdatePassword />,
    name: "updatePassword",
    isPublic: true,
  },
  {
    url: "contact",
    page: <Contact />,
    name: "contact",
    isPublic: true,
  },
];
