import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import NavItem from "./NavItem";
import { NAV_ITEMS } from "./const";
import { List } from "@mui/material";

const Sidebar = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const parsedNav = (ITEMS) => {
    const parsedItems = [];
    ITEMS.forEach((item) => {
      if (!item.subItems) {
        parsedItems.push(item);
        return;
      }

      parsedItems.push({ ...item, subItems: item.subItems });
    });

    return parsedItems;
  };

  const navItems = useMemo(() => {
    // if (!isAuthenticated) {
    //   return [];
    // }
    return parsedNav(NAV_ITEMS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <List>
      {navItems.map((item, index) => (
        <NavItem key={item.label} index={index} {...item} open={props.open} />
      ))}
    </List>
  );
};

export default Sidebar;
