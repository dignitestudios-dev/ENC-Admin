// useDeleteSlot.js
import axios from "../../axios";
import { useState } from "react";
import { SuccessToast } from "../../components/global/Toaster";
import { processError } from "../../lib/utils";


const useDeleteSlot = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteData = async (url) => {
    try {
      setDeleteLoading(true);
      console.log("Deleting:", url);

      const response = await axios.delete(url);
      SuccessToast(response?.data?.message || "Deleted successfully");
     
      return response?.data;
    } catch (error) {
      console.error("Delete error:", error);
      processError(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return { deleteLoading, deleteData };
};

export { useDeleteSlot };
