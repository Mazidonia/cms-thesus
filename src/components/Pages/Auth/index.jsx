import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Joi from "joi";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import { LogIn as LogInIcon } from "react-feather";
import { useDispatch } from "react-redux";
import { getCss } from "libs/styles";
import Input from "components/UI/Input";

import { THEME } from "libs/styles/const";
import { useCustomMutation } from "libs/api";
import { ENDPOINTS } from "libs/api/const";
import { authSuccess } from "store/slices/authSlice";
import {
  LS_JWT_TOKEN_KEY,
  LS_JWT_REFRESH_KEY,
  LS_STUDENT_INFO,
} from "libs/api/const";

const MainLayoutRoot = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url("/cms-thesis/static/images/bg2.jpg");
`;

const Scontainer = styled.div`
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  border-top: 3px solid #33691e;
  box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%);
`;

const STitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${getCss("cTextDark")};
  margin: 8px;
`;

const Login = ({ isAuthReady, isAuthenticated, isMounted }) => {
  const { mutateAsync, isLoading, isError, error } = useCustomMutation({});
  const dispatch = useDispatch();
  const schema = Joi.object({
    USERNAME: Joi.string().required().messages({
      "string.base": `กรุณากรอกข้อมูล`,
      "string.empty": `กรุณากรอกข้อมูล`,
      "any.required": `กรุณากรอกข้อมูล`,
    }),
    PASSWORD: Joi.string().required().messages({
      "string.base": `กรุณากรอกข้อมูล`,
      "string.empty": `กรุณากรอกข้อมูล`,
      "any.required": `กรุณากรอกข้อมูล`,
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      const res = await mutateAsync({
        path: ENDPOINTS.login,
        method: "POST",
        body: { password: data.PASSWORD, username: data.USERNAME },
      });

      const { accessToken, refreshToken, studentData } = res;

      localStorage.setItem(LS_JWT_TOKEN_KEY, accessToken);
      localStorage.setItem(LS_JWT_REFRESH_KEY, refreshToken);
      localStorage.setItem(LS_STUDENT_INFO, JSON.stringify(studentData));
      dispatch(authSuccess());
    } catch (error) {
      console.warn("error", error);
    }
  };

  return (
    <MainLayoutRoot>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xs">
          <Scontainer>
            <Box sx={{ mb: 3 }}>
              <STitleWrapper>
                <Typography color="textPrimary" variant="h5">
                  ระบบจัดการข้อมูลวิทยานิพนธ์ ระดับบัณฑิตศึกษา
                </Typography>
              </STitleWrapper>
              <STitleWrapper>
                <Typography color="textPrimary" variant="h4">
                  {isAuthReady
                    ? "เข้าสู่ระบบเพื่อเริ่มเซสชันของคุณ"
                    : isMounted
                    ? "Checking User..."
                    : "Preparing App..."}
                </Typography>
              </STitleWrapper>
            </Box>
            {isAuthReady && !isAuthenticated && (
              <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      {...register("USERNAME")}
                      isError={!!errors?.USERNAME}
                      label="รหัสเจ้าหน้าที่"
                      placeholder=""
                      errorMsg={errors?.USERNAME?.message}
                      hasRequired
                      type="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      {...register("PASSWORD")}
                      isError={!!errors?.PASSWORD}
                      label="รหัสผ่าน"
                      placeholder=""
                      errorMsg={errors?.PASSWORD?.message}
                      hasRequired
                      type="password"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ pt: 0 }}>
                  {isError && (
                    <div
                      style={{
                        marginTop: 12,
                        textAlign: "center",
                        backgroundColor: THEME.cDangerMain,
                        padding: 6,
                        borderRadius: 4,
                      }}
                    >
                      <Typography color={THEME.cWhite} variant="overline">
                        {error || "มีบางอย่างผิดพลาด"}
                      </Typography>
                    </div>
                  )}
                </Box>
                <Box sx={{ py: 2 }}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isLoading}
                    color="primary"
                    startIcon={<LogInIcon />}
                  >
                    เข้าสู่ระบบ
                  </LoadingButton>
                </Box>
              </form>
            )}
            <Box
              sx={{
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <STitleWrapper>งานบัณฑิตศึกษา</STitleWrapper>
              <STitleWrapper>มหาวิทยาลัยราชภัฏเพชรบูรณ์</STitleWrapper>
            </Box>
          </Scontainer>
        </Container>
      </Box>
    </MainLayoutRoot>
  );
};

export default Login;
