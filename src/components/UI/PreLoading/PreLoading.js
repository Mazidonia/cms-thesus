import React from "react";
import styled from "@emotion/styled";

const SLoader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;

  div {
    padding: 20px;
    border-radius: 50px;
    background-color: #ffffff;
  }
`;

function GlobalLoader({ msg }) {
  return (
    <SLoader>
      <div>{msg || "เตรียมพร้อมโปรแกรม..."}</div>
    </SLoader>
  );
}

export default GlobalLoader;
