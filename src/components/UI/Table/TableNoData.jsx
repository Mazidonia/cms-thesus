import React from "react";

import { TableCell } from "@mui/material";

const TableNoData = (props) => {
  const { colSpan, isLoading, msg } = props;
  return (
    <TableCell align='center' colSpan={colSpan}>
      {isLoading ? "กำลังดึงข้อมูล..." : msg ? msg : "ไม่พบข้อมูล"}
    </TableCell>
  );
};

export default TableNoData;
