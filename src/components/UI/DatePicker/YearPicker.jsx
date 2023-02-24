import React, { useState } from "react";
import { ClickAwayListener } from "@mui/base";
import { getCss } from "libs/styles";
import InputYearPicker from "components/UI/Input/InputYearPicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";

const YearPicker = (props) => {
  const {
    onChange,
    value,

    label,
    name,
    isDisabled,
    isError,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const onChangeHandler = (date) => {
    onChange(date);
    setIsOpen(false);
  };

  const onClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };
  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <MUIDatePicker
          open={isOpen}
          label={label}
          inputFormat="yyyy"
          onChange={onChangeHandler}
          value={value}
          components={{
            OpenPickerIcon: CalendarMonthIcon,
          }}
          PopperProps={{
            placement: "bottom-end",
            anchorEl: anchorEl,
          }}
          maxDate={new Date()}
          renderInput={({ inputRef, inputProps: { ...otherProps }, label }) => {
            return (
              <InputYearPicker
                name={name}
                disabled={isDisabled}
                label={label}
                {...otherProps}
                ref={inputRef}
                isError={isError}
                onClick={onClickHandler}
                endAdornment={
                  <CalendarMonthIcon
                    sx={{ paddingRight: 0.5, color: `${getCss("cTextLight")}` }}
                    onClick={onClickHandler}
                  />
                }
              />
            );
          }}
          views={["year"]}
        />
      </div>
    </ClickAwayListener>
  );
};

export default YearPicker;
