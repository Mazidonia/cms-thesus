import { useQuery } from "react-query";
// import axios from "libs/api/config-axios";
// import { ENDPOINTS } from "libs/api/const";
// import { getQueryString } from "libs/utils/format";

//http://localhost:8000/v1/unit-measures?search_unit=G&limit=10&offset=0&order_by=unit&order_direction=ASC'
const useFetchDataUser = (apiQueryParams) => {
  const { data: res, ...queryRes } = useQuery(
    ["fetchDataFetchDataUser", apiQueryParams],
    () => {
      // const res = await axios.get(
      //   `${ENDPOINTS.unitMeasures}?${getQueryString(apiQueryParams)}`
      // );
      return { username: "ATEn" };
    },
    {
      enabled: true,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  return { ...queryRes, res };
};

export { useFetchDataUser };
