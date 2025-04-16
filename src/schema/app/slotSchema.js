import * as Yup from "yup";

export const slotSchema = Yup.object({
  day: Yup.string().required("Day is required"),
  startTime: Yup.string()
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Start time must be in HH:MM format"
    )
    .required("Start time is required"),
  startIsAm: Yup.string().oneOf(["AM", "PM"]).required(),
  endTime: Yup.string()
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "End time must be in HH:MM format"
    )
    .required("End time is required"),
  endIsAm: Yup.string().oneOf(["AM", "PM"]).required(),
});
export const priceSchema = Yup.object({
  price: Yup.number()
    .required("Price is required")
    .typeError("Price must be a number") // Ensures it's treated as a number
    .positive("Price must be a positive number"), // Optional: ensures the number is positive
});
