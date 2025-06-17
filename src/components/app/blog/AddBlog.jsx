import { useFormik } from "formik";
import { FiLoader } from "react-icons/fi";
import { blogSchema } from "../../../schema/app/slotSchema";
import { blogValues } from "../../../init/app/SloteValues";
import Input from "../../global/Input";
import { useSetAvaliability } from "../../../hooks/api/Post";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
export default function AddBlog({ isOpen, setIsOpen, isReload, setIsReload }) {
  console.log(isOpen, "test");
  const { loading, postData } = useSetAvaliability();
  const [preview, setPreview] = useState(null);

  const {
    values,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    handleChange,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: blogValues,
    validationSchema: blogSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const form = new FormData();
      form.append("media", values.media);
      form.append("title", values.title);
      form.append("content", values.content);
      const res = await postData("blogs", false, null, form);
      console.log(res);
      if (res.success) {
        resetForm();
        setIsReload(!isReload);
        setIsOpen(false);
      }
    },
  });
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFieldValue("media", file);
    }
  };
  return (
    isOpen && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white  w-[520px] py-6  rounded-[16px] ">
          <div className="flex  px-6 flex-col justify-center gap-y-4 h-full">
            <div className="flex justify-between items-center gap-3">
              <h3 className="text-2xl text-black">Create Blog</h3>
              <IoMdClose
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                size={22}
              />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className="w-full flex mb-2 cursor-pointer items-center gap-2  mt-3">
                <label
                  htmlFor="profilePicture"
                  className="flex items-center gap-2"
                >
                  <img
                    src={preview ? preview : "/upload.png"}
                    alt="upload photo"
                    className="w-[80px]"
                  />

                  <p className="w-full text-[#3C043A] ml-2 font-medium underline text-[14px] leading-[100%]">
                    Upload Profile Picture
                  </p>
                </label>
                <div>
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    value={""}
                    onChange={handleFileChange}
                    className=" bg-transparent hidden rounded-full placeholder:text-[#FFFFFF] outline-none text-white  px-3 text-[14px] font-normal leading-[20.4px]"
                    placeholder="Enter Title"
                  />
                </div>
              </div>
              {errors.media && touched.media ? (
                <p className="text-red-700 mb-2 text-sm font-medium">
                  {errors.media}
                </p>
              ) : null}
              <Input
                text={"Title"}
                name={"title"}
                type={"title"}
                holder={"Title"}
                value={values.title}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.title}
                touched={touched?.title}
              />
              <div className="mt-3">
                <p className="font-[700] capitalize text-[12px]">Content</p>
                <textarea
                  rows={3}
                  className={`w-full py-2 px-3 resize-none rounded-[4px] border text-sm ${
                    errors.content && touched.content
                      ? "border-red-500"
                      : "border-[#D9D9D9]"
                  }`}
                  id="content"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your specific goals..."
                />
                {errors.content && touched.content && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.content}
                  </div>
                )}
              </div>
              <div className="flex mt-8 items-center justify-center gap-5 ">
                <button
                  type="submit"
                  className="w-full h-[50px] rounded-[14px] bg-[#181818] text-white flex gap-2 items-center justify-center text-md font-medium"
                >
                  Submit
                  {loading && <FiLoader className="animate-spin text-lg " />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
