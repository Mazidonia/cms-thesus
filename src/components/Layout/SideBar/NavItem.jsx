import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
} from "@mui/material";
import {
  Apps as AppsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

const NavItem = (props) => {
  const { href, icon, isSubLink, label, subItems } = props;

  const router = useRouter();

  const getIsLinkActive = (link, current) => {
    if (link === "/") return link === current;
    const linkCompare = current.substring(0, link.length);
    return linkCompare === link;
  };

  const parsedSubItemLinks = (items) => {
    const res = items.reduce((obj, val) => {
      if (val.subItems) {
        obj = obj.concat(parsedSubItemLinks(val.subItems));
      } else {
        obj.push(val.href);
      }
      return obj;
    }, []);
    return res;
  };

  const subItemLinks = useMemo(() => {
    if (!subItems) {
      return [];
    }
    return parsedSubItemLinks(subItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subItems]);

  const isSubItemLinkActive = subItemLinks.some((link) => {
    return getIsLinkActive(link, router.pathname);
  });

  const { sidebarCollapsed } = useSelector((state) => state.view);
  const [isToggled, setIsToggled] = useState(isSubItemLinkActive);

  return (
    <>
      {!subItems?.length && href ? (
        <ListItem key={href} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component="a"
            sx={{
              minHeight: 48,
              justifyContent: sidebarCollapsed ? "initial" : "center",
              px: 2.5,
              pl: isSubLink ? 4 : undefined,
            }}
            selected={getIsLinkActive(href, router.pathname)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sidebarCollapsed ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              {!isSubLink ? icon ? icon : <AppsIcon /> : <ChevronRightIcon />}
            </ListItemIcon>
            <Link href={href}>
              <ListItemText
                primary={label}
                sx={{ opacity: sidebarCollapsed ? 1 : 0 }}
              />
            </Link>
          </ListItemButton>
        </ListItem>
      ) : (
        <>
          <ListItem key={href} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={(event) => {
                //onCtaClicked();
                setIsToggled(!isToggled);
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
                {icon ? icon : <AppsIcon />}
              </ListItemIcon>
              <ListItemText
                primary={label}
                sx={{ opacity: sidebarCollapsed ? 1 : 0 }}
              />
              {isToggled ? (
                <ExpandLessIcon sx={{ opacity: sidebarCollapsed ? 1 : 0 }} />
              ) : (
                <ExpandMoreIcon sx={{ opacity: sidebarCollapsed ? 1 : 0 }} />
              )}
            </ListItemButton>
          </ListItem>
        </>
      )}
      {Boolean(subItems?.length) && (
        <Collapse
          in={isToggled}
          timeout="auto"
          unmountOnExit
          style={{ display: !sidebarCollapsed ? "none" : undefined }}
        >
          <List component="div" disablePadding tabIndex={-1}>
            {subItems?.map((item, idx, arr) => {
              return (
                <NavItem
                  index={idx}
                  isHidden={!isToggled}
                  isLastLink={idx === arr.length - 1}
                  isSubLink
                  key={item.label}
                  {...item}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default NavItem;
