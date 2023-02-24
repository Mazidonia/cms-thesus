import React from "react";
import { components, default as ReactSelect } from "react-select";
import { alpha, styled } from "@mui/material/styles";
import { THEME } from "libs/styles/const";
import { Typography } from "@mui/material";
import styledEmotion from "@emotion/styled";
import classNames from "classnames";

const ClassRequired = "isRequired";
const ClassReadOnly = "readOnly";

const SError = styled(Typography)({
  THEME: THEME.cErrorMain,
});

const SWrapper = styledEmotion.div`

`;

const SLabel = styledEmotion.span`
  font-size: 14px;
  color: ${THEME.cTextDark};
  &.${ClassRequired}:after {
    content: " *";
    color: ${THEME.cErrorMain};
    position: absolute;
    transform: translateX(2.25px) translateY(-3.75px);
  }

  &.${ClassReadOnly} {
    font-weight: 600;
  }
`;

function CustomInput(props) {
  return (
    <>
      <components.Input {...props} maxLength={props.selectProps.maxLength} />
    </>
  );
}

const SelectCustomComponents = {
  Input: CustomInput,
};

const Select = (props) => {
  const {
    id,
    defaultValue,
    isClearable,
    isDisabled,
    isError,
    isLoading,
    isSearchable = true,
    maxLength,
    name,
    onChange,
    options,
    value,
    placeholder,
    label,
    errorMsg,
    noneMarginBottom,
    customComponents,
    isRequired,
    isReadOnly,
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
      flex: 1,
    }),
    placeholder: (base) => ({
      ...base,
      THEME: THEME.cTextLight,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px 8px",
    }),
  };
  const hasError = Boolean(isError);
  const showErrorMessage = Boolean(hasError && isError.message);
  return (
    <SWrapper
      noneMarginBottom={noneMarginBottom}
      hasErrorMessage={showErrorMessage}
    >
      {label && (
        <SLabel
          htmlFor={id || name}
          className={classNames(
            isRequired && ClassRequired,
            isReadOnly && ClassReadOnly
          )}
        >
          {label}
        </SLabel>
      )}
      <ReactSelect
        id={id || name}
        components={customComponents || SelectCustomComponents}
        instanceId={id || name}
        classNamePrefix={isError ? "error" : undefined}
        defaultValue={defaultValue}
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
        options={options}
        value={value || null}
        styles={CStyle}
      />
      {isError && (
        <SError variant="caption" noWrap gutterBottom>
          {errorMsg}
        </SError>
      )}
    </SWrapper>
  );
};

export default Select;
