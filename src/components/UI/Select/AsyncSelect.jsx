import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { THEME } from "../../Theme/const";
import { InputLabel, Typography } from "@mui/material";
import AsyncSelect from "react-select/async";

const SError = styled(Typography)({
  color: THEME.cErrorMain,
});

const CSelect = (props) => {
  const {
    id,
    defaultValue,
    isClearable,
    isDisabled,
    isError,
    errorMsg,
    isLoading,
    isSearchable = true,
    maxLength,
    name,
    onChange,
    value,
    placeholder,
    label,
    isMulti,
    defaultOptions,
    loadOptions,
  } = props;
  const CStyle = {
    control: (
      base,
      { isDisabled, isFocused, selectProps: { classNamePrefix } }
    ) => ({
      ...base,
      backgroundColor: isDisabled ? THEME.cDisabled : THEME.cWhite,
      borderRadius: 4,
      boxShadow:
        classNamePrefix === "error" && isFocused
          ? `${alpha(THEME.cErrorMain, 0.25)} 0 0 0 0.2rem`
          : isFocused
          ? `${alpha(THEME.cPrimary, 0.25)} 0 0 0 0.2rem`
          : "none",
      borderWidth: 1,
      borderColor:
        classNamePrefix === "error" ? THEME.cErrorMain : THEME.cPrimary,
      "&:hover": {
        border: `solid 1px ${
          classNamePrefix === "error" ? THEME.cErrorMain : THEME.cPrimary
        }`,
      },
    }),
    menu: (base) => ({
      ...base,
      textAlign: "left",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    container: (base) => ({
      ...base,
      marginTop: "-6px",
    }),
    placeholder: (base) => ({
      ...base,
      color: THEME.cTextLight,
    }),
  };

  return (
    <>
      {label && (
        <InputLabel shrink error={isError}>
          {label}
        </InputLabel>
      )}
      <AsyncSelect
        instanceId={id || name}
        classNamePrefix={isError ? "error" : undefined}
        defaultValue={defaultValue}
        defaultOptions={defaultOptions || true}
        placeholder={placeholder}
        inputId={id || name}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isSearchable={isSearchable}
        loadingMessage={() => "กำลังดึงข้อมูล..."}
        menuPlacement="auto"
        maxLength={maxLength}
        menuPosition="fixed"
        name={name}
        onChange={(data) => {
          onChange(data);
        }}
        noOptionsMessage={() => "ไม่พบตัวเลือก"}
        loadOptions={loadOptions}
        value={value || null}
        styles={CStyle}
        isMulti={isMulti}
      />
      {isError && (
        <SError variant="caption" noWrap gutterBottom>
          {errorMsg}
        </SError>
      )}
    </>
  );
};

export default CSelect;
