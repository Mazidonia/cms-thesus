import { useQuery } from "react-query";
import axios from "libs/api/config-axios";
import { ENDPOINTS } from "libs/api/const";
import { getQueryString } from "libs/utils/format";

//http://localhost:8000/v1/locations?search_name=L&search_id=2&search_location_transportations=AIR,SEA&search_location_types=CARGO,LADEN&limit=10&offset=0&order_by=name&order_direction=ASC
const useFetchDataStudents = (apiQueryParams, enabled = true) => {
  const { data: res, ...queryRes } = useQuery(
    ["fetchDataStudents", apiQueryParams],
    async () => {
      const res = await axios.get(
        `${ENDPOINTS.students}?${getQueryString(apiQueryParams)}`
      );
      return res.data;
    },
    {
      enabled,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  return { ...queryRes, res };
};
//https://d23jyzkth6e1ii.cloudfront.net/v1/locations?search_id=9

const useFetchDataLocation = (id, enabled) => {
  const { data: res, ...queryRes } = useQuery(
    ["fetchDataLocations", id],
    async () => {
      const res = await axios.get(`${ENDPOINTS.locations}?search_id=${id}`);
      return res.data?.data[0];
    },
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );
  return { ...queryRes, res };
};

export { useFetchDataStudents, useFetchDataLocation };
