import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import TimeSlotModal from "../../../components/timeslot/timeSlotModal";
import { CiTrash } from "react-icons/ci";
import { DollarIcon } from "../../../assets/export";
import { useUsers } from "../../../hooks/api/Get";
import { formatTimeRange } from "../../../lib/helpers";
import { useDeleteSlot } from "../../../hooks/api/Delete";
import { useFormik } from "formik";
import { useSetPrice } from "../../../hooks/api/Post";
import { priceValue } from "../../../init/app/SloteValues";
import { priceSchema } from "../../../schema/app/slotSchema";

export default function TimeSlots() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const { loading, data, pagination, setReload, reload } =
    useUsers(`availabilities`);
  const { deleteLoading, deleteData } = useDeleteSlot();
  const [deletingId, setDeletingId] = useState(null);
  const handleDelete = (day) => {
    if (!day) return;
    const url = `availabilities/${day}`;
    console.log("Request to delete day:", day);
    deleteData(url);
    setReload(!reload);
  };

  const { priceLoading, postData } = useSetPrice();
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: priceValue,
    validationSchema: priceSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const res = await postData("price", false, null, {
        price: values.price,
      });
      console.log(res);
      if (res.success) {
        resetForm();
      }
    },
  });

  return (
    <div className="mx-auto bg-[#FFFFFF] h-full rounded-[16px] px-6 py-6">
      <div className="md:w-[400px]">
        <h3 className="text-[#202224] font-[600] text-[32px] ">
          Time Slots Management
        </h3>
        <p className="text-[16px] mt-1 font-[400] text-[#565656]">
          Update your Time slots and Price
        </p>
        <div className="mt-4">
          <p className="text-[#181818] font-[500] text-[14px]">
            Add time Slots
          </p>
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer flex items-center justify-center underline  font-[400] text-[12px] hover:border-dashed h-[105px] border mt-2 border-[#BEBEBE] rounded-[12px]"
          >
            + Add New Slots
          </div>
        </div>
        {data?.length > 0 && (
          <div className="h-full max-h-[180px] my-2 px-2 overflow-auto">
            {data?.map((item, index) => (
              <div
                key={item.id || index}
                className="w-full py-1 px-2 mt-2 rounded-[8px] bg-[#D9D9D9]"
              >
                <div className="text-[12px] font-[400] flex items-center justify-between ">
                  <div>
                    <p className="text-[10px] text-[#444444] font-[400]">
                      {item?.day}
                    </p>
                    <p>{formatTimeRange(item?.startTime, item?.endTime)}</p>
                  </div>
                  <button
                    onClick={() => {
                      setDeletingId(item?._id);
                      handleDelete(item.day);
                    }}
                  >
                    {deleteLoading && deletingId == item?._id ? (
                      <FiLoader className="animate-spin text-lg" />
                    ) : (
                      <CiTrash />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mt-3">
            <label
              htmlFor="price"
              className="text-[#181818] font-[500] text-[14px]"
            >
              Slot Price
            </label>
            <div
              className={`flex items-center mb-3 w-full p-1 ${
                touched.price && errors.price ? "border-red-500 border" : "border border-gray-300"
              } px-2  mt-2 rounded-[12px] overflow-hidden`}
            >
              <div className="flex items-center pl-1 font-[400]">
                <img src={DollarIcon} alt="dollar" className=" h-3" />
              </div>
              <input
                type="text"
                name="price"
                className={`flex-1  h-[40px] !rounded-[12px] px-3  bg-transparent border-none outline-none text-gray-700`}
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
              <p className={`mb-2 text-red-400 `} >
                {touched.price && errors.price&&errors.price}
              </p>
          </div>
          <button
            type="submit"
            className="w-full h-[49px] rounded-[8px] bg-[#000000] text-white flex gap-2 items-center justify-center text-md font-medium"
          >
            <span>Save</span>
            {priceLoading && <FiLoader className="animate-spin text-lg " />}
          </button>
        </form>

        <TimeSlotModal
          isOpen={isOpen}
          setTimeSlots={setTimeSlots}
          setIsOpen={setIsOpen}
          reload={reload}
          setReload={setReload}
        />
      </div>
    </div>
  );
}
