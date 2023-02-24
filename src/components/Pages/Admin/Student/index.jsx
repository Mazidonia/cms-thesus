import { useRef, useMemo } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Box, Grid } from "@mui/material";
import usePagination from "components/UI/Table/usePagination";
import Breadcrumb from "components/UI/Breadcrumb";
import Filter from "./filter";
import { useFetchDataStudents } from "./useFetch";
import { ResponsiveWrapper } from "components/UI/Shared";
import Pagination from "components/UI/Table/Pagination";
import Table from "./Table";

import {
  SPageContainer,
  SWrapperPageTopSection,
} from "components/UI/Container";

const SWrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function pageUrlQueryParamsSanitizer({ search_status, ...rest }) {
  return {
    search_status: search_status?.toUpperCase(),
    ...rest,
  };
}

function pageApiQueryParamsFormatter({ search_status, ...rest }) {
  return {
    search_status: search_status?.toUpperCase(),
    ...rest,
  };
}

export default function Location() {
  const router = useRouter();

  const LINKS = [
    { label: "HOME", href: "/" },
    { label: "ข้อมูลนักศึกษา", href: "" },
  ];

  const urlQueryParams = useRef({});
  const apiQueryParams = useRef({});
  const filterRef = useRef({});

  const isInit = Object.keys(urlQueryParams.current).length > 0;

  const {
    getPaginationProps,
    showPagination,
    setParamsWithRouter,
    tableSortProps,
  } = usePagination({
    apiQueryParams,
    isInit,
    pageUrlQueryParamsSanitizer,
    pageApiQueryParamsFormatter,
    router,
    urlQueryParams,
  });

  const { res, isFetching, isFetched, isPreviousData } = useFetchDataStudents(
    apiQueryParams.current,
    isInit
  );

  const paginationProps = getPaginationProps(
    res?.meta?.total,
    isFetched || isPreviousData
  );

  const initFillterFormProps = useMemo(() => {
    const {
      search_name: initSearchName,
      search_location_types: initLocationTypes,
      search_status: initStatus,
      search_location_transportations: initTransportations,
    } = urlQueryParams.current;

    return {
      initSearchName,
      initStatus,
      initLocationTypes,
      initTransportations,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(urlQueryParams)]);

  const onSubmitFillterFormHandler = (data) => {
    const { textSearchName, status, locationTypes, transportation } = data;
    setParamsWithRouter(
      {
        page: "1",
        search_name: textSearchName,
        search_status: status,
        search_location_types: locationTypes,
        search_location_transportations: transportation,
      },
      router
    );
  };

  return (
    <>
      <SPageContainer>
        <Breadcrumb links={LINKS} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Filter
              ref={filterRef}
              isDisabled={isFetching}
              handleSubmit={(data) => onSubmitFillter(data)}
              {...initFillterFormProps}
            />
            <ResponsiveWrapper>
              <Table apiData={res?.results} isLoading={isFetching} />
            </ResponsiveWrapper>
            {/* <Pagination {...paginationProps} tableName="province" /> */}
          </Grid>
        </Grid>
      </SPageContainer>
    </>
  );
}
