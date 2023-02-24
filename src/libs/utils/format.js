import parseISO from "date-fns/parseISO";
import queryString from "query-string";
import { TABLE_DEFAULT_LIMIT } from "../../components/UI/Table";
import currency from "currency.js";

export function getQueryString(queryParams, removeKeys) {
  const parsedObj = { ...queryParams };

  if (removeKeys) {
    removeKeys.forEach((key) => {
      delete parsedObj[key];
    });
  }

  return queryString.stringify(parsedObj, {
    skipEmptyString: true,
    skipNull: true,
  });
}

export function formatPaginationParams(inputLimit, page) {
  const limit = inputLimit || TABLE_DEFAULT_LIMIT;
  return {
    page,
    limit,
    offset: page ? ((+page - 1) * +limit).toString() : "0",
  };
}

export function getSanitizedNumberString(input, fallback) {
  if (!input || !/^\d*$/.test(input)) {
    return fallback;
  }
  return input;
}

export const DATE_FORMAT = "yyyy-MM-dd";

export const DAY_PICKER_LOCALE = {
  WEEKDAYS_SHORT: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
  WEEKDAYS_SHORT_DATETIME: {
    Sun: "อา",
    Mon: "จ",
    Tue: "อ",
    Wed: "พ",
    Thu: "พฤ",
    Fri: "ศ",
    Sat: "ส",
  },
  MONTHS: [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฏาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ],
  MONTHS_SHORT: [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ],
};

export function newDate(date) {
  if (
    typeof date == "undefined" ||
    date == null ||
    date == "0000-00-00 00:00:00"
  )
    return undefined;
  return parseISO(date);
}

export function getApiFormattedDate(date) {
  if (!date) {
    return date;
  }
  const d = new Date(date);
  const day = `${d.getDate()}`.padStart(2, "0");
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const year = d.getFullYear();

  return `${year}-${month}-${day}`;
}

export function getFormattedDateTime(date, type) {
  if (
    typeof date == "undefined" ||
    date == null ||
    date == "0000-00-00 00:00:00"
  )
    return "-";

  const dYear = date.substring(0, 4); //2019
  const dMonth = parseInt(date.substring(5, 7)) - 1;
  const dDay = date.substring(8, 10);
  const dTime = date.substring(11, 19);
  const dYearThai = parseInt(dYear) + 543;

  switch (type) {
    case "full":
      return `วันที่ ${dDay} เดือน${DAY_PICKER_LOCALE.MONTHS[dMonth]} พ.ศ.${dYearThai}`;
    case "middle":
      return `${dDay} ${DAY_PICKER_LOCALE.MONTHS[dMonth]} ${dYearThai}`;
    case "short":
      return `${dDay} ${DAY_PICKER_LOCALE.MONTHS_SHORT[dMonth]} ${dYearThai}`;
    case "digit":
      return `${dDay}/${DAY_PICKER_LOCALE.MONTHS_SHORT[dMonth]}/${dYearThai}`;
    case "middleWithTime":
      return `${dDay} ${DAY_PICKER_LOCALE.MONTHS[dMonth]} ${dYearThai} ${dTime} น.`;
    default:
      return `${dDay} ${DAY_PICKER_LOCALE.MONTHS[dMonth]} ${dYearThai}`;
  }
}

export function getFormattedNumber(value, precision = 2, fallback = "-") {
  return !value && value !== 0
    ? fallback
    : currency(value, {
        precision,
        symbol: "",
      }).format();
}

export function getFormattedThaiDate(date) {
  //console.log("getFormattedThaiDate", date);
  if (!date) {
    return date;
  }
  const d = new Date(date);
  const day = `${d.getDate()}`.padStart(2, "0");
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const year = d.getFullYear() + 543;

  return `${day}-${month}-${year}`;
}

export function getStartYear(startYear = new Date().getFullYear()) {
  const currentYear = new Date().getFullYear();
  const endYear = startYear > currentYear ? startYear : currentYear;
  let years = [];
  startYear = 1950;
  while (startYear <= endYear) {
    years.push(startYear++);
  }
  return years;
}
