import { useState, useEffect } from "react";
import axios from "../../axios";
import { processError } from "../../lib/utils";

const useUsers = (
  url,
  currentPage = 1,
  search = "",
  startDate = "",
  endDate = ""
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [reload, setReload] = useState(false);

  const toISO = (date) => {
    if (!date) return "";
    const iso = new Date(date).toISOString();
    return iso;
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const isoStart = toISO(startDate);
      const isoEnd = toISO(endDate);
      let query = `${url}?page=${currentPage}&limit=5&search=${search}`;

      if (isoStart) {
        query += `&startDate=${isoStart}`;
      }

      if (isoEnd) {
        query += `&endDate=${isoEnd}`;
      }

      const { data } = await axios.get(query);

      setData(data?.data);
      setPagination(data?.pagination);
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, reload, search, startDate, endDate]);

  return { loading, data, pagination, setReload, reload };
};

export { useUsers };
