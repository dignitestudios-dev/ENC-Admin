import { darkContact, lightCalendar, lightContact, lightdashboard, lightLock,lightTime,lightUser,whiteCalendar, whitedashboard,whiteLock, whiteTime, whiteUser } from "../assets/export";

export const sidebarData = [
  {
    title: "Dashboard",
    icon:lightdashboard,
    whiteIcon:whitedashboard,
    link: "/dashboard",
  },
  {
    title: "Users Management",
    icon: lightUser,
    whiteIcon:whiteUser,
    link: "/users",
  },
  {
    title: "Appointment Management",
    icon: lightCalendar,
    whiteIcon:whiteCalendar,
    link: "/appointments",
  }, 
  {
    title: "Time Slot Management",
    icon: lightTime,
    whiteIcon:whiteTime,
    link: "/timeslot",
  }, 
  
  {
    title: "Contacts",
    icon: lightContact,
    whiteIcon:darkContact,
    link: "/contact",
  }, 
  {
    title: "Blogs",
    icon: lightContact,
    whiteIcon:darkContact,
    link: "/blog",
  }, 
  
  {
    title: "Update Password",
    icon: lightLock,
    whiteIcon:whiteLock,
    link: "/update-password",
  }, 
];
