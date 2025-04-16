import { useLogin } from "../../hooks/api/Post";
import { processLogin } from "../../lib/utils";
import { useFormik } from "formik";
import { NavLink } from "react-router";
import { FiLoader } from "react-icons/fi";
import Input from "../../components/global/Input";
import { loginValues } from "../../init/authentication/LoginValues";
import { signInSchema } from "../../schema/authentication/LoginSchema";

const Login = () => {
  const { loading, postData } = useLogin();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = {
          email: values?.email,
          password: values?.password,
        };
        postData("auth/admin/signIn", false, null, data, processLogin);
      },
    });

  return (
    <div className="w-full h-full  grid  md:grid-cols-2   rounded-[19px] bg-white">
      <div className="flex justify-center px-6 md:px-0 flex-col items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="w-full md:w-[393px]  mt-5 flex flex-col justify-start items-start gap-4"
        >
          <div className="text-start">
            <h2 className="text-[36px] font-bold leading-[48px] capitalize">
              log in
            </h2>
            <p className="text-[14px] font-normal text-start mt-2 leading-[27px] text-[#868686]">
              Enter below details to log in
            </p>
          </div>
          <Input text={"email address"} name={"email"} type={"email"} holder={"chris.tom@gmail.com"} value={values.email} handleBlur={handleBlur} handleChange={handleChange} error={errors.email} touched={touched?.email} />
          <Input text={"Password"} name={"password"} type={"password"} holder={"*****************"} value={values.password} handleBlur={handleBlur} handleChange={handleChange} error={errors.password} touched={touched?.password} />
          <div className="w-full -mt-1  flex items-center justify-end">
            <NavLink
              to={"/auth/forgot-password"}
              className="text-black hover:no-underline hover:text-black text-[12px] font-normal leading-[20.4px]"
            >
              Forgot Password?
            </NavLink>
          </div>

          <button
            type="submit"
            className="w-full h-[49px] rounded-[8px] bg-[#000000] text-white flex gap-2 items-center justify-center text-md font-medium"
          >
            <span>Log In</span>
            {loading && <FiLoader className="animate-spin text-lg " />}
          </button>
        </form>
      </div>
      <div className="h-full w-full hidden md:flex bg-[#EDEDED]"></div>
    </div>
  );
};

export default Login;
