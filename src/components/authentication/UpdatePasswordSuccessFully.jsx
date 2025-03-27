import { useEffect } from "react";
import Modal from "react-modal";
import { Success } from "../../assets/export";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
const UpdatePasswordSuccessfully = ({ isOpen, setIsOpen, update }) => {
  const navigate=useNavigate("");
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
          navigate("/auth/login");
        setIsOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Page Not Found"
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[16px] shadow-lg  py-2 px-2 flex flex-col justify-center gap-3 w-[400px]  h-[250px] text-center">
        <div className="flex justify-end">
          <button onClick={() => setIsOpen(!isOpen)}>
            <IoMdClose size={25} />
          </button>
        </div>
        <div className="flex items-center flex-col justify-center gap-y-4 h-full">
          <div className="flex flex-col gap-y-2 items-center">
            <img src={Success} className="w-[80px]" alt="CheckBox" />
            <h3 className="text-2xl text-[#000505]">
              {" "}
              {!update ? "Password Changed" : "Password updated Successfully!"}
            </h3>
             <p className="text-[#565656] text-[16px] font" > {update ? "Your password has been updated successfully." : ""}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePasswordSuccessfully;
