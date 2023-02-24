import React from "react";
import { Grid, Pagination, PaginationItem } from "@mui/material";
import styled from "@emotion/styled";
import { bool, string, number } from "prop-types";

const SContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const TablePagination = (props) => {
  const {
    curPage = 1,
    isDisabled,
    queryParams,
    totalItems = 0,
    totalPages = 0,
    tableName,
  } = props;

  return (
    <Grid container>
      <Grid item xs={12} sm={12} style={{ padding: "20px" }}>
        <SContainerWrapper>
          <div>จำนวน {totalItems} รายการ</div>
          <Pagination
            size="small"
            name={tableName}
            count={totalPages}
            defaultPage={1}
            variant="outlined"
            shape="rounded"
            page={curPage}
            disabled={isDisabled}
            renderItem={(item) => (
              <PaginationItem
                //component={Link}
                to={`?${queryParams ? `${queryParams}&` : ""}page=${item.page}`}
                {...item}
              />
            )}
          />
        </SContainerWrapper>
      </Grid>
    </Grid>
  );
};

TablePagination.propTypes = {
  curPage: number,
  isDisabled: bool,
  queryParams: string,
  totalItems: number,
  totalPages: number,
  tableName: string,
};

export default TablePagination;
