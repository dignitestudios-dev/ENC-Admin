import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter your email"),
  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain atleast 6 alphanumeric characters.")
    .required("Please enter your password"),
});

export const forgotSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter your email"), 
});

export const ChangedSchema = Yup.object({
  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain atleast 6 alphanumeric characters.")
    .required("Please enter your password"),
  confirmpassword: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain atleast 6 alphanumeric characters.")
    .required("Please enter your password"),
});
