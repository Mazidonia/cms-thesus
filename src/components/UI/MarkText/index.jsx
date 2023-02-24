import React, { forwardRef, useState, useEffect } from "react";
import { IMaskMixin } from "react-imask";
//import { IMaskInput } from "react-imask";
import Input from "../Input";

const PLACEHOLDER_ID_CARD = "x-xxxx-xxxxx-xx-x";
const PLACEHOLDER_PHONE = "xxx-xxxxxxx";

const MARK_TEXT = IMaskMixin(({ inputRef, ...props }) => {
  return <Input ref={inputRef} {...props} />;
});

// eslint-disable-next-line  react/display-name
export const IDCardMark = forwardRef(
  ({ defaultValue, onChange, ...otherProps }, ref) => {
    const [value, setValue] = useState(defaultValue?.toString() || "");
    const handleAccept = (v) => {
      setValue(v);
      onChange(v);
    };

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    return (
      <MARK_TEXT
        ref={ref}
        {...otherProps}
        mask="0-0000-00000-00-0"
        unmask
        onAccept={handleAccept}
        placeholder={PLACEHOLDER_ID_CARD}
        value={value}
      />
    );
  }
);

// eslint-disable-next-line  react/display-name
export const PhoneMark = forwardRef(
  ({ defaultValue, onChange, ...otherProps }) => {
    const [value, setValue] = useState(defaultValue?.toString() || "");

    const handleAccept = (v) => {
      setValue(v);
      onChange(v);
    };

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);
    return (
      <MARK_TEXT
        {...otherProps}
        mask="000-0000000"
        unmask
        onAccept={handleAccept}
        placeholder={PLACEHOLDER_PHONE}
        value={value}
      />
    );
  }
);

// eslint-disable-next-line react/display-name
export const InputMark = forwardRef(
  ({ defaultValue, onChange, ...otherProps }, ref) => {
    const [value, setValue] = useState(defaultValue?.toString() || "");

    const handleAccept = (val) => {
      setValue(val);
      onChange(val);
    };

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);
    return (
      <MARK_TEXT
        ref={ref}
        unmask
        onAccept={handleAccept}
        value={value}
        {...otherProps}
      />
    );
  }
);
