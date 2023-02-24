import React, { useState } from "react";
import styled from "@emotion/styled";
import classNames from "classnames";
import {
  Table as MuiTable,
  TableHead as MuiTableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import { getCss } from "libs/styles";
import { THEME } from "libs/styles/const";

export const TABLE_DEFAULT_LIMIT = "20";

export const STableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-right: auto;
  margin-left: auto;
  -webkit-overflow-scrolling: touch;
`;

export const STableRowTransition = styled(TableRow)`
  background-color: #eeeeee;
  transition: all 0.2s ease-in-out;
`;

export const STableCellTransition = styled(TableCell)`
  padding-bottom: 26px !important;
  &.expandoff {
    border-bottom: 0px !important;
    padding: 0px !important;
    transition: all 0.4s ease-in-out;
  }
`;

export const STableHead = styled(MuiTableHead)`
  background-color: #eeeeee;
`;

export const STableHeadTh = styled(TableCell)`
  color: ${getCss("cTextPrimary")};
`;

export const STable = styled(MuiTable)`
  width: 100%;
`;

export const RenderRow = (props) => {
  const {
    cols,
    customData,
    onRowClicked,
    row,
    rowIdx,
    selectorNode,
    tableName,
    getToggleChildren,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const ariaId = `${tableName ? `${tableName}_` : ""}row_${rowIdx}`;

  return (
    <>
      <TableRow
        {...(getToggleChildren && {
          "aria-controls": ariaId,
          "aria-expanded": isExpanded,
        })}
        onClick={onRowClicked ? (e) => onRowClicked(row, e) : undefined}
      >
        {cols.map(({ isSelector, name, renderBody, styleRow }) => {
          const colVal = row[name];
          return (
            <TableCell
              key={name}
              style={styleRow}
              align={styleRow?.align}
              padding={styleRow?.padding}
            >
              {isSelector
                ? selectorNode
                : renderBody
                ? renderBody({
                    colVal,
                    customData,
                    isToggled: isExpanded,
                    rowData: row,
                    number: rowIdx + 1,
                    togglerFn: setIsExpanded,
                  })
                : colVal || "-"}
            </TableCell>
          );
        })}
      </TableRow>
      {getToggleChildren && (
        <TableRow
          id={ariaId}
          style={{
            display: isExpanded ? undefined : "none",
          }}
        >
          <TableCell
            colSpan={cols.length}
            style={{
              borderLeft: `solid 2px ${getCss("cPrimary")}`,
            }}
          >
            {getToggleChildren(isExpanded, setIsExpanded)}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
