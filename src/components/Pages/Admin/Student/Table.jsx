import { useMemo, useCallback } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import {
  Article as ArticleIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
} from "@mui/icons-material";

import {
  RenderRow,
  STable,
  STableHeadTh,
  STableHead,
  Collapse,
} from "components/UI/Table";
import RowEditToggle from "components/UI/Table/RowEditToggle";
import { getCss } from "libs/styles";
import { getStudentTypeValue } from "components/Pages/shared/utils";
import TableNoData from "components/UI/Table/TableNoData";
import View from "./View";

const SIcon = styled.img`
  width: 20px;
  margin: 0px 8px;
  cursor: pointer;
`;

const SName = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: ${getCss("CLightBlue")};
`;

const STableTbody = styled.tbody`
  & tr:nth-of-type(4n + 1) {
    background-color: #f5f3f7;
  }
`;

const STableHeadCustom = styled(STableHead)`
  th {
    font-size: 14px;
    font-weight: 500;
    vertical-align: middle;
    padding: 8px 4px;
  }
`;

const STableCustom = styled(STable)`
  --border-radius: 0px;

  border-spacing: 0px 2px;
  td {
    font-size: 14px;
    font-weight: 300;
    vertical-align: middle;
    padding: 8px 4px;
  }
`;

function getColumnsCustom() {
  return [
    {
      name: "toggler",
      label: "#",
      renderBody: function RenderBody({ isToggled, togglerFn }) {
        return <RowEditToggle isToggled={isToggled} togglerFn={togglerFn} />;
      },
      styleCol: {
        minWidth: 60,
        textAlign: "center",
      },
      styleRow: {
        padding: "none",
        textAlign: "center",
      },
    },
    {
      name: "student_id",
      label: "รหัสนักศึกษา",
      sortable: true,
      renderBody: function RenderBody({ rowData: { student_id } }) {
        return <SName>{student_id || "-"}</SName>;
      },
      styleCol: {
        minWidth: 130,
      },
      styleRow: {},
    },
    {
      name: "student_name",
      label: "ชื่อ-สกุล",
      sortable: true,
      renderBody: function RenderBody({ rowData: { student_name } }) {
        return student_name || "-";
      },
      styleCol: {
        minWidth: 180,
      },
    },
    {
      name: "student_type",
      label: "แผน",
      sortable: true,
      renderBody: function RenderBody({ rowData: { student_type } }) {
        return getStudentTypeValue(student_type);
      },
      styleCol: {
        minWidth: 80,
      },
    },
    {
      name: "student_major",
      label: "สาขา",
      sortable: true,
      renderBody: function RenderBody({ rowData: { student_major } }) {
        return student_major || "-";
      },
      styleCol: {
        textAlign: "left",
        minWidth: 250,
      },
    },

    {
      name: "Action",
      label: "Action",
      renderBody: function RenderBody({ rowData: { id } }) {
        return (
          <>
            {/* <Link
              href={{
                pathname: "/setting/location/update",
                query: { id: id },
              }}
            >
              <SIcon src="/static/images/icons/ic_edit_outline.png" />
            </Link> */}
            <IconButton
              color="info"
              aria-label="upload picture"
              component="label"
              size="small"
            >
              <PrintIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              size="small"
            >
              <ArticleIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="error"
              aria-label="upload picture"
              component="label"
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        );
      },
      styleCol: {
        minWidth: 100,
        textAlign: "center",
      },
      styleRow: {
        textAlign: "center",
      },
    },
  ];
}

const Table = (props) => {
  const { apiData, isFetching, onSort, orderBy, orderDir } = props;

  const COLS = useMemo(() => getColumnsCustom(), []);
  const tableHeaders = useMemo(
    () =>
      COLS.map(({ name, label, styleCol }) => (
        <STableHeadTh key={name} style={styleCol}>
          {label}
        </STableHeadTh>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [COLS, isFetching, onSort, orderBy, orderDir]
  );

  const onRowClicked = useCallback(() => {
    //const query = { product_id: rowData.id };
  }, []);

  return (
    <STableCustom>
      <STableHeadCustom>
        <tr>{tableHeaders}</tr>
      </STableHeadCustom>
      <STableTbody>
        {isFetching || !apiData || apiData.length === 0 ? (
          <tr>
            <TableNoData colSpan={COLS.length} isFetching={isFetching} />
          </tr>
        ) : (
          apiData.map((row, idx) => (
            <RenderRow
              onRowClicked={onRowClicked}
              key={idx}
              cols={COLS}
              row={row}
              rowIdx={idx}
              getToggleChildren={(isToggled, setIsToggled) => {
                return <View row={row} setIsToggled={setIsToggled} />;
              }}
            />
          ))
        )}
      </STableTbody>
    </STableCustom>
  );
};

export default Table;
