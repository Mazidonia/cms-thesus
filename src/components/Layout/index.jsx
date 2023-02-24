import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import EmoStyled from "@emotion/styled";
import Link from "next/link";
import {
  Box,
  Avatar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  AppBar as MuiAppBar,
  CssBaseline,
  Drawer as MuiDrawer,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DialogConfirm from "components/UI/Dialog";
import useAuth from "libs/auth";
import Login from "components/Pages/Auth";
import { toggleSidebar } from "store/slices/viewSlice";
import { LS_SIDEBAR_TOGGLE_KEY } from "components/Layout/const";
import { LS_STUDENT_INFO } from "libs/api/const";
import Sidebar from "./SideBar";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";

import { THEME } from "libs/styles/const";
import useMediaQuery from "@mui/material/useMediaQuery";
import { safeSSRCall } from "libs/utils";
import { logOut } from "libs/auth";

const SImg = EmoStyled.img`
  max-width: 100%;
  height: auto;
  cursor:pointer;
`;

const SIDEBAR_WIDTH = 280;

const openedMixin = (theme) => ({
  width: SIDEBAR_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.primary.main,
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: `${SIDEBAR_WIDTH}px`,
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    minHeight: "calc(100vh - 64px)",
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: 64,
    marginLeft: 64,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: SIDEBAR_WIDTH,
    }),
  })
);

function Layout({ children }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isAuthReady = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpenFormLogout, setIsOpenFormLogout] = useState(false);

  const matches = useMediaQuery("(min-width:600px)", { noSsr: true });

  const studentInfo = safeSSRCall(
    () => JSON.parse(localStorage.getItem(LS_STUDENT_INFO)),
    []
  );

  useEffect(() => {
    dispatch(
      toggleSidebar(
        safeSSRCall(() => !!localStorage.getItem(LS_SIDEBAR_TOGGLE_KEY), false)
      )
    );
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(toggleSidebar(matches && sidebarCollapsed ? true : false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  const sidebarCollapsed = useSelector((state) => state.view.sidebarCollapsed);
  const isUserLoaded = useSelector((state) => state.auth.isUserLoaded);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" color="default" open={sidebarCollapsed}>
        <Toolbar>
          {!sidebarCollapsed && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                const newState = !sidebarCollapsed;
                dispatch(toggleSidebar(newState));
                if (newState) {
                  localStorage.setItem(LS_SIDEBAR_TOGGLE_KEY, "true");
                } else {
                  localStorage.removeItem(LS_SIDEBAR_TOGGLE_KEY);
                }
              }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            ระบบบริหารจัดการข้อมูลวิทยานิพนธ์ ระดับบัณฑิตศึกษา
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={sidebarCollapsed}>
        <DrawerHeader>
          <Link href="/">
            <picture>
              <SImg src="/cms-thesis/static/images/logo.png" alt="logo" />
            </picture>
          </Link>
          <IconButton
            onClick={() => {
              const newState = !sidebarCollapsed;
              dispatch(toggleSidebar(newState));
              if (newState) {
                localStorage.setItem(LS_SIDEBAR_TOGGLE_KEY, "true");
              } else {
                localStorage.removeItem(LS_SIDEBAR_TOGGLE_KEY);
              }
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: THEME.cWhite }} />
            ) : (
              <ChevronLeftIcon sx={{ color: THEME.cWhite }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider
          sx={{
            ...(!sidebarCollapsed && { display: "none" }),
          }}
        />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            p: 2,
            ...(!sidebarCollapsed && { display: "none" }),
          }}
        >
          <Avatar
            sx={{
              cursor: "pointer",
              width: 64,
              height: 64,
            }}
          />
          <Typography color="textSecondary" variant="body2" sx={{ pt: 2 }}>
            {studentInfo?.STD_CODE}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${studentInfo?.PREFIX_NAME}${studentInfo?.FIRST_NAME} ${studentInfo?.LAST_NAME}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {studentInfo?.MAJOR_NAME}
          </Typography>
        </Box>
        <Divider />
        <Sidebar open={sidebarCollapsed} />
        <Divider />
        <ListItem key="form-logout" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={(event) => {
              setIsOpenFormLogout(true);
              event.stopPropagation();
            }}
            sx={{
              minHeight: 48,
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sidebarCollapsed ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary="ออกจากระบบ"
              sx={{ opacity: sidebarCollapsed ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <DialogConfirm
          isOpen={isOpenFormLogout}
          title="ออกจากระบบ"
          msg="ยืนยันการออกจากระบบ"
          handleClose={() => setIsOpenFormLogout(false)}
          handleConfirm={() => logOut(true)}
          cancelText="ละทิ้ง"
          colorCancelBtn="inherit"
        />
      </Drawer>
      <Main open={sidebarCollapsed}>{children}</Main>
    </Box>
  );
  // return (
  //   <>
  //     {isUserLoaded ? (
  //       <Box>
  //         <CssBaseline />
  //         <AppBar position="fixed" color="default" open={sidebarCollapsed}>
  //           <Toolbar>
  //             {!sidebarCollapsed && (
  //               <IconButton
  //                 color="inherit"
  //                 aria-label="open drawer"
  //                 onClick={() => {
  //                   const newState = !sidebarCollapsed;
  //                   dispatch(toggleSidebar(newState));
  //                   if (newState) {
  //                     localStorage.setItem(LS_SIDEBAR_TOGGLE_KEY, "true");
  //                   } else {
  //                     localStorage.removeItem(LS_SIDEBAR_TOGGLE_KEY);
  //                   }
  //                 }}
  //                 edge="start"
  //               >
  //                 <MenuIcon />
  //               </IconButton>
  //             )}
  //             <Typography variant="h6" noWrap component="div">
  //               ระบบฐานข้อมูลงานวิจัย
  //             </Typography>
  //           </Toolbar>
  //         </AppBar>
  //         <Drawer variant="permanent" open={sidebarCollapsed}>
  //           <DrawerHeader>
  //             <Link href="/">
  //               <picture>
  //                 <SImg src="/student/static/images/logo.png" alt="logo" />
  //               </picture>
  //             </Link>
  //             <IconButton
  //               onClick={() => {
  //                 const newState = !sidebarCollapsed;
  //                 dispatch(toggleSidebar(newState));
  //                 if (newState) {
  //                   localStorage.setItem(LS_SIDEBAR_TOGGLE_KEY, "true");
  //                 } else {
  //                   localStorage.removeItem(LS_SIDEBAR_TOGGLE_KEY);
  //                 }
  //               }}
  //             >
  //               {theme.direction === "rtl" ? (
  //                 <ChevronRightIcon sx={{ color: THEME.cWhite }} />
  //               ) : (
  //                 <ChevronLeftIcon sx={{ color: THEME.cWhite }} />
  //               )}
  //             </IconButton>
  //           </DrawerHeader>
  //           <Divider
  //             sx={{
  //               ...(!sidebarCollapsed && { display: "none" }),
  //             }}
  //           />
  //           <Box
  //             sx={{
  //               alignItems: "center",
  //               display: "flex",
  //               flexDirection: "column",
  //               p: 2,
  //               ...(!sidebarCollapsed && { display: "none" }),
  //             }}
  //           >
  //             <Avatar
  //               sx={{
  //                 cursor: "pointer",
  //                 width: 64,
  //                 height: 64,
  //               }}
  //             />
  //             <Typography color="textSecondary" variant="body2" sx={{ pt: 2 }}>
  //               {studentInfo?.STD_CODE}
  //             </Typography>
  //             <Typography color="textSecondary" variant="body2">
  //               {`${studentInfo?.PREFIX_NAME}${studentInfo?.FIRST_NAME} ${studentInfo?.LAST_NAME}`}
  //             </Typography>
  //             <Typography color="textSecondary" variant="body2">
  //               {studentInfo?.MAJOR_NAME}
  //             </Typography>
  //           </Box>
  //           <Divider />
  //           <Sidebar open={sidebarCollapsed} />
  //           <Divider />
  //           <ListItem
  //             key="form-logout"
  //             disablePadding
  //             sx={{ display: "block" }}
  //           >
  //             <ListItemButton
  //               onClick={(event) => {
  //                 setIsOpenFormLogout(true);
  //                 event.stopPropagation();
  //               }}
  //               sx={{
  //                 minHeight: 48,
  //                 px: 2.5,
  //               }}
  //             >
  //               <ListItemIcon
  //                 sx={{
  //                   minWidth: 0,
  //                   mr: sidebarCollapsed ? 1 : "auto",
  //                   justifyContent: "center",
  //                 }}
  //               >
  //                 <ExitToAppIcon />
  //               </ListItemIcon>
  //               <ListItemText
  //                 primary="ออกจากระบบ"
  //                 sx={{ opacity: sidebarCollapsed ? 1 : 0 }}
  //               />
  //             </ListItemButton>
  //           </ListItem>
  //           <DialogConfirm
  //             isOpen={isOpenFormLogout}
  //             title="ออกจากระบบ"
  //             msg="ยืนยันการออกจากระบบ"
  //             handleClose={() => setIsOpenFormLogout(false)}
  //             handleConfirm={() => logOut(true)}
  //             cancelText="ละทิ้ง"
  //             colorCancelBtn="inherit"
  //           />
  //         </Drawer>
  //         <Main open={sidebarCollapsed}>{children}</Main>
  //       </Box>
  //     ) : (
  //       <Login
  //         isAuthReady={isAuthReady}
  //         isAuthenticated={isAuthenticated}
  //         isMounted={isMounted}
  //       />
  //     )}
  //   </>
  // );
}

export default Layout;
