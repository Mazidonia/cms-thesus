import React from "react";
import {
  Home as HomeIcon,
  MenuBook as MenuBookIcon,
  ReceiptLong as ReceiptLongIcon,
  Book as BookIcon,
} from "@mui/icons-material";

export const CLASS_COLLAPSED = "collapsed";
export const LS_SIDEBAR_TOGGLE_KEY = "sidebar_min";
export const NAV_ITEMS = [
  {
    label: "หน้าหลัก",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    label: "ข้อมูลนักศึกษา",
    icon: <MenuBookIcon />,
    href: "/student",
  },
  {
    label: "ข้อมูลอาจารย์",
    icon: <MenuBookIcon />,
    href: "/",
  },
  {
    label: "ข้อมูลผู้เชียวชาญ",
    icon: <BookIcon />,
    href: "/thesis",
  },
  {
    label: "รายงานข้อมูล",
    icon: <BookIcon />,
    href: "/thesis",
  },
];
