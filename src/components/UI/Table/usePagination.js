import {
  formatPaginationParams,
  getQueryString,
  getSanitizedNumberString,
} from "libs/utils/format";

import { useCallback, useMemo } from "react";
import { TABLE_DEFAULT_LIMIT } from ".";

function setParamsWithRouter(overrideParams, router, clearNonPaginationParams) {
  const newParams = {};
  // eslint-disable-next-line prefer-object-spread
  const paginateParams = Object.assign({}, router.query);

  Object.keys(overrideParams).forEach((key) => {
    const value = overrideParams[key];

    if (value) {
      newParams[key] = value;
    }

    delete paginateParams[key];
  });

  delete paginateParams.prev;

  const { page, limit, order_by, order_direction } = paginateParams;

  return router.replace(
    {
      query: Object.assign(
        clearNonPaginationParams ? { page, limit } : paginateParams,
        order_by && order_direction ? { order_by, order_direction } : {},
        newParams
      ),
    },
    undefined,
    { scroll: false, shallow: true }
  );
}

function getTotalPages(total, limit, page, router) {
  const pages = Math.ceil(+total / +limit);

  if (+page > pages && +page !== 1) {
    setParamsWithRouter({ page: "1" }, router);
  }

  return pages;
}

/** NOTE: This hook should be placed before React Query get hook */
function usePagination({
  apiQueryParams,
  excludePaginationParams = false,
  initOrder,
  isInit,
  pageApiQueryParamsFormatter,
  pageUrlQueryParamsSanitizer,
  router,
  syncUrlParamsAfterInit = false,
  urlQueryParams,
  onInit,
}) {
  const sanitizedData = useMemo(() => {
    if (!router.isReady)
      return { limit: null, order_by: null, order_direction: null, page: null };
    let { limit, page, order_by, order_direction, ...otherParams } =
      router.query;
    let urlParams = { ...router.query };

    if (!isInit || (!excludePaginationParams && (!limit || !page))) {
      limit = getSanitizedNumberString(limit, TABLE_DEFAULT_LIMIT);
      page = getSanitizedNumberString(page, "1");
      // eslint-disable-next-line prefer-object-spread
      urlParams = Object.assign(
        excludePaginationParams ? {} : { limit, page },
        otherParams
      );

      if (initOrder && !order_by && !order_direction) {
        order_by = initOrder.by;
        order_direction = initOrder.direction;
      }

      if (
        order_by &&
        (order_direction === "desc" || order_direction === "asc")
      ) {
        urlParams = Object.assign(urlParams, { order_by, order_direction });
      } else {
        order_by = "";
        order_direction = "";
      }

      if (pageUrlQueryParamsSanitizer) {
        otherParams = pageUrlQueryParamsSanitizer(otherParams);
        urlParams = Object.assign(urlParams, otherParams);
      }

      setParamsWithRouter(urlParams, router);

      // eslint-disable-next-line no-param-reassign
      urlQueryParams.current = urlParams;
      onInit?.();
    } else if (syncUrlParamsAfterInit) {
      // eslint-disable-next-line no-param-reassign
      urlQueryParams.current = urlParams;
    }

    //urlQueryParams.current = urlParams;
    // eslint-disable-next-line no-param-reassign
    apiQueryParams.current = Object.assign(
      excludePaginationParams ? {} : formatPaginationParams(limit, page),
      order_by && order_direction ? { order_by, order_direction } : {},
      pageApiQueryParamsFormatter
        ? pageApiQueryParamsFormatter(otherParams)
        : otherParams
    );

    return urlParams;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(router.query)]);

  const { limit, order_by, order_direction, page } = sanitizedData;

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
        onChangePageHandler: (page) => {
          setParamsWithRouter(
            {
              page: page,
            },
            router
          );
        },
        totalPages,
        queryParams: getQueryString(router.query, ["page"]),
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, page, JSON.stringify(router.query)]
  );

  const tableSortProps = useMemo(
    () => ({
      onSort: (newBy) => {
        let newDirection = "asc";

        if (newBy === order_by) {
          newDirection = order_direction === "asc" ? "desc" : "asc";
        }

        setParamsWithRouter(
          { order_by: newBy, order_direction: newDirection },
          router
        );
      },
      orderBy: order_by,
      orderDir: order_direction,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order_by, order_direction, JSON.stringify(router.query)]
  );

  return {
    getPaginationProps,
    getTotalPages,
    skip: (+page - 1) * +limit,
    showPagination: isInit && page && limit,
    setParamsWithRouter,
    tableSortProps,
  };
}

export default usePagination;
