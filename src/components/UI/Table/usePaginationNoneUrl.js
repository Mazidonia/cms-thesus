import { useState, useCallback, useMemo } from "react";
import {
  formatPaginationParams,
  getQueryString,
  getSanitizedNumberString,
} from "../../../libs/utils/format";
import queryString from "query-string";

import { TABLE_DEFAULT_LIMIT } from ".";

const usePaginationNoneUrl = (props) => {
  const [urlWithParams, setUrlWithParams] = useState("");

  const {
    apiQueryParams,
    pageApiQueryParamsFormatter,
    pageUrlQueryParamsSanitizer,
    isInit,
    router,
    trigger,
  } = props;

  const getTotalPages = (total, limit) => {
    const pages = Math.ceil(+total / +limit);

    // if (+page > pages && +page !== 1) {
    //   setParamsWithRouter({ page: "1" }, router);
    // }

    return pages;
  };

  const sortStringify = (obj) => {
    return Object.keys(obj)
      .map((key) => {
        const value = obj[key];
        return `${key}+${value}`;
      })
      .join(",");
  };

  const setParamsWithRouter = (overrideParams, router) => {
    const newParams = {};
    const newParamsWithOutSort = {};
    const paginateParams = Object.assign({}, queryString.parse(router.current));

    Object.keys(overrideParams).forEach((key) => {
      const value = overrideParams[key];
      if (value && key != "sort") {
        newParams[key] = value;
      } else {
        newParamsWithOutSort[key] = value;
      }
      delete paginateParams[key];
    });

    let url = queryString.stringify(Object.assign(paginateParams, newParams));

    if (newParamsWithOutSort["sort"]) {
      const sortString = `&sort=${sortStringify(newParamsWithOutSort["sort"])}`;
      url = url + sortString;
    }

    setUrlWithParams(url);
  };

  const sanitizedDataSort = useMemo(() => {
    let { sort } = queryString.parse(router.current);

    if (!sort) return {};
    const sortSplit = sort.split(",");

    const sortObj = sortSplit.reduce((obj, val) => {
      const field = val.split(" ");
      obj = Object.assign(obj, { [field[0]]: field[1] });

      return obj;
    }, {});

    return sortObj;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.current, trigger]);

  const sanitizedData = useMemo(() => {
    let { sort, limit, page, ...otherParams } = queryString.parse(
      router.current
    );
    let urlParams = queryString.parse(router.current);

    if (!isInit) {
      limit = getSanitizedNumberString(limit, TABLE_DEFAULT_LIMIT);
      page = getSanitizedNumberString(page, "1");

      urlParams = Object.assign({ limit, page }, otherParams);

      if (sort) {
        urlParams = Object.assign(urlParams, { sort: sanitizedDataSort });
      }

      if (pageUrlQueryParamsSanitizer) {
        otherParams = pageUrlQueryParamsSanitizer(otherParams);
        urlParams = Object.assign(urlParams, otherParams);
      }
      setParamsWithRouter(urlParams, router);
    }

    // let apiParams = Object.assign(sort ? { sort } : {}, otherParams);
    let apiParams = Object.assign(
      formatPaginationParams(limit, page),
      sort ? { sort } : {},
      otherParams
    );
    if (pageApiQueryParamsFormatter) {
      apiParams = Object.assign(
        apiParams,
        pageApiQueryParamsFormatter(otherParams)
      );
    }
    apiQueryParams.current = apiParams;
    return urlParams;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.current, trigger]);

  const { limit, page } = sanitizedData;

  const getPaginationProps = useCallback(
    (total, isDataFetched) => {
      const totalItems = total ? +total : 0;
      const totalPages = isDataFetched
        ? getTotalPages(totalItems, limit, page, router)
        : 0;
      return {
        isDisabled: totalItems === 0,
        totalItems,
        curPage: +page,
        defaultLimit: limit,
        onChangeLimitHandler: (newLimit) => {
          setParamsWithRouter(
            {
              limit: newLimit,
              page: "1",
            },
            router
          );
        },
        onChangePage: (params) => {
          setParamsWithRouter(params, router);
        },
        totalPages,
        queryParams: getQueryString(router.query, ["page"]),
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, page, router]
  );

  //https://stackoverflow.com/questions/578380/url-query-string-convention-for-multiple-sort
  //http://myapp.com/books?sort=author+ASC,datepublished+DESC&count=12
  const tableSortProps = useMemo(
    () => ({
      onSort: (newBy) => {
        let newDirection = "ASC";
        let dataSortObj = { ...sanitizedDataSort };
        if (Object.prototype.hasOwnProperty.call(sanitizedDataSort, newBy)) {
          dataSortObj[newBy] =
            sanitizedDataSort[newBy] === "ASC" ? "DESC" : "ASC";
        } else {
          dataSortObj[newBy] = newDirection;
        }
        setParamsWithRouter({ sort: dataSortObj }, router.current);
      },
      sort: sanitizedDataSort,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.current, trigger]
  );

  return {
    getTotalPages,
    getPaginationProps,
    setParamsWithRouter,
    tableSortProps,
    showPagination: isInit && page && limit,
    urlWithParams,
  };
};

export default usePaginationNoneUrl;
