// All the helper functions should must be there.
// The functions that you're using multiple times must be there.
// e.g. formatDateToMMDDYYYY, formatEpochToMMDDYYYY, etc.
export function formatDate(date) {
    console.log(date);
  
    const year = date?.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
    return `${year}-${month}-${day}`;
  }
  

  export const formatTime = (startTimeISO) => {
    // Format a single time
    const formatTime = (isoString) => {
      const date = new Date(isoString);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
  
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  
      return `${hours}:${formattedMinutes} ${ampm}`;
    };
  
    const formattedStartTime = formatTime(startTimeISO);
  
    return `${formattedStartTime}`;
  };
  
  export const formatTimeRange = (startTimeISO, endTimeISO) => {
    // Format a single time
    const formatTime = (isoString) => {
      const date = new Date(isoString);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
  
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
  
      // Add leading zero to minutes if needed
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  
      return `${hours}:${formattedMinutes} ${ampm}`;
    };
  
    const formattedStartTime = formatTime(startTimeISO);
    const formattedEndTime = formatTime(endTimeISO);
  
    return `${formattedStartTime} - ${formattedEndTime}`;
  };