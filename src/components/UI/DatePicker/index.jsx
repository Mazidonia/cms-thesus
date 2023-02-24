import React, { forwardRef, useMemo, useState, useRef } from "react";
import { getCss } from "libs/styles";
import styled from "@emotion/styled";
import InputDatePicker from "components/UI/Input/InputDatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker, {
  registerLocale,
  CalendarContainer,
} from "../Calendar/index";

import { DAY_PICKER_LOCALE } from "libs/utils/format";
import th from "date-fns/locale/th";
registerLocale("th", th);

const SLabelDate = styled.span`
  font-size: 14px;
  font-family: Kanit;
`;

const SLabelMonth = styled.span`
  font-size: 16px;
  color: ${getCss("cTextPrimary")};
  font-family: Kanit;
`;

const SLabelDay = styled.span`
  font-family: Kanit;
  font-size: 16px;
  color: ${getCss("cBorder")};
`;
const SLabelYear = styled.span`
  font-size: 16px;
  margin-left: 6px;
  color: ${getCss("cTextPrimary")};
  font-family: Kanit;
`;

const SIcon = styled.img`
  cursor: pointer;
  width: 12px;
`;

const SDatePicker = (props) => {
  const {
    disabledDaysAfter,
    disabledDaysBefore,
    placeholder,
    onDayChange,
    value,
    prefixIconSrc,
    label,
    name,
    isDisabled,
    isError,
  } = props;

  const customInputRef = useRef();

  const [isMonthPicker, setMonthPicker] = useState(false);
  const [isYearPicker, setIsYearPicker] = useState(false);
  const { WEEKDAYS_SHORT_DATETIME, MONTHS } = DAY_PICKER_LOCALE;

  const renderDayContents = (day) => {
    return <SLabelDate>{day}</SLabelDate>;
  };

  const dayPickerProps = useMemo(
    () => ({
      maxDate:
        disabledDaysAfter === undefined
          ? undefined
          : disabledDaysAfter || new Date(),
      minDate:
        disabledDaysBefore === undefined
          ? undefined
          : disabledDaysBefore || new Date(),
    }),
    [disabledDaysAfter, disabledDaysBefore]
  );

  const CustomInputDatePicker = forwardRef(({ ...props }, ref) => {
    return (
      <>
        <InputDatePicker
          {...props}
          label={label}
          type="text"
          ref={ref}
          placeholder={placeholder}
          isError={isError}
          endAdornment={
            <CalendarMonthIcon
              sx={{ paddingRight: 0.5, color: `${getCss("cTextLight")}` }}
              onClick={() => onDayChange(undefined)}
            />
          }
          startAdornment={prefixIconSrc}
        />
        {/* {isError && (
          <SError variant="caption" noWrap gutterBottom>
            {props?.errorMsg}
          </SError>
        )} */}
      </>
    );
  });

  CustomInputDatePicker.displayName = "CustomInputDatePicker";

  // const calendarBox = ({ children }) => {
  //   const el = document.getElementById("calendar-portal");
  //   return <Portal container={el}>{children}</Portal>;
  // };

  const customCalendarContainer = ({ className, children }) => {
    return (
      <div
        style={{
          marginTop: -20,
          padding: 24,
          background: "#fff",
          borderRadius: 4,
          border: "1px solid #E5E0EB",
          boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CalendarContainer className={className}>
          <div style={{ position: "relative", width: "100%" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <DatePicker
      popperProps={{
        positionFixed: true,
      }}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        changeYear,
      }) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: 12,
            }}
          >
            <div>
              <SLabelMonth onClick={() => setMonthPicker(true)}>
                {MONTHS[date.getMonth()]}
              </SLabelMonth>
              <SLabelYear onClick={() => setIsYearPicker(true)}>
                {date.getFullYear() + 543}
              </SLabelYear>
            </div>
            <div style={{ marginRight: 6 }}>
              <SIcon
                onClick={() => {
                  if (isYearPicker) {
                    changeYear(date.getFullYear() - 12);
                  } else if (isMonthPicker) {
                    changeYear(date.getFullYear() - 1);
                  } else {
                    decreaseMonth();
                  }
                }}
                src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC`}
              />
              <SIcon
                style={{ marginLeft: 6 }}
                onClick={() => {
                  if (isYearPicker) {
                    changeYear(date.getFullYear() + 12);
                  } else if (isMonthPicker) {
                    changeYear(date.getFullYear() + 1);
                  } else {
                    increaseMonth();
                  }
                }}
                src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==`}
              />
            </div>
          </div>
        );
      }}
      showYearPicker={isYearPicker}
      showMonthYearPicker={isMonthPicker}
      calendarContainer={customCalendarContainer}
      name={name}
      {...dayPickerProps}
      dateFormat="dd/MM/yyyy"
      selected={value}
      customInput={<CustomInputDatePicker ref={customInputRef} />}
      onChange={(date) => {
        onDayChange(date);
      }}
      onSelect={() => {
        if (isYearPicker) {
          setIsYearPicker(false);
          setMonthPicker(true);
        } else if (isMonthPicker) {
          setMonthPicker(false);
        }
      }}
      shouldCloseOnSelect={isYearPicker || isMonthPicker ? false : true}
      renderDayContents={renderDayContents}
      disabled={isDisabled}
      popperPlacement="bottom"
      popperModifiers={[
        {
          name: "offset",
          options: {
            offset: [5, 10],
          },
        },
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "viewport",
            tether: false,
            altAxis: true,
          },
        },
      ]}
      formatWeekDay={(nameOfDay) => {
        return (
          <SLabelDay>
            {WEEKDAYS_SHORT_DATETIME[nameOfDay.toString().substr(0, 3)]}
          </SLabelDay>
        );
      }}
      onCalendarClose={() => {
        setIsYearPicker(false);
        setMonthPicker(false);
      }}
      //strictParsing={true}
      locale={th}
    />
  );
};

SDatePicker.displayName = "SDatePicker";

export default SDatePicker;
