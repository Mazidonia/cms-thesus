import styled from "@emotion/styled";
import React, { Component } from "react";
import Head from "next/head";

export const SErrorBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    :first-of-type {
      font-size: 40px;
      margin-bottom: 10px;
    }

    :nth-of-type(2) {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }

  a {
    display: block;
  }
`;

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error, _errorInfo) {
    console.error("Uncaught error:", _error, _errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Head>
            <title>STUDENT Thesis - Error</title>
            <meta name="description" content="Invalid page" />
          </Head>
          <SErrorBox>
            <div>Oops</div>
            <div>เกิดปัญหาขึ้น</div>
            <a href={window.location.href}>
              <a>ลองใหม่อีกครั้ง</a>
            </a>
          </SErrorBox>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
