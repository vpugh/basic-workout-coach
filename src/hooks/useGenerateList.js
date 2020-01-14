import { useState, useEffect } from "react";
import { fetchGet } from "../utils/api";

export default function useGenerateList(props) {
  const [list, setList] = useState(null);

  useEffect(() => {
    const getListData = async () => {
      const res = await fetchGet(props);
      setList(res);
    };
    getListData();
  }, [props]);

  return {
    [`${props}List`]: list
  };
}
