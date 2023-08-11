/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddProduct,
  toggleBrowseProducts,
  toggleCart,
  toggleRecentOrders,
  toggleYourProducts,
} from "../../features/dashboard/dashboardSlice";

function ListItems() {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);

  return (
    <React.Fragment>
      {/* <ListItemButton onClick={() => dispatch(toggleAddProduct())}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItemButton> */}
      <ListItemButton onClick={() => dispatch(toggleRecentOrders())}>
        <ListItemIcon>
          <ReceiptLongIcon
            color={dashboard.recentOrders ? `secondary` : "inherit"}
            fontSize={dashboard.recentOrders ? "large" : "medium"}
          />
        </ListItemIcon>
        <ListItemText
          primary='Recent Orders'
          disableTypography
          sx={{
            fontSize: dashboard.recentOrders ? "1.3rem" : "1rem",
            color: dashboard.recentOrders ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => dispatch(toggleCart())}>
        <ListItemIcon>
          <Badge color='primary' badgeContent={99}>
            <ShoppingCartIcon
              color={dashboard.cart ? `secondary` : "inherit"}
              fontSize={dashboard.cart ? "large" : "medium"}
            />
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary='Cart'
          disableTypography
          sx={{
            fontSize: dashboard.cart ? "1.3rem" : "1rem",
            color: dashboard.cart ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => dispatch(toggleBrowseProducts())}>
        <ListItemIcon>
          <CategoryIcon
            color={dashboard.browseProducts ? "secondary" : "inherit"}
            fontSize={dashboard.browseProducts ? "large" : "medium"}
          />
        </ListItemIcon>
        <ListItemText
          primary='Browse Products'
          disableTypography
          sx={{
            fontSize: dashboard.browseProducts ? "1.3rem" : "1rem",
            color: dashboard.browseProducts ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => dispatch(toggleYourProducts())}>
        <ListItemIcon>
          <InventoryIcon
            color={dashboard.yourProducts ? `secondary` : "inherit"}
            fontSize={dashboard.yourProducts ? "large" : "medium"}
          />
        </ListItemIcon>
        <ListItemText
          primary='Your Products'
          disableTypography
          sx={{
            fontSize: dashboard.yourProducts ? "1.3rem" : "1rem",
            color: dashboard.yourProducts ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => dispatch(toggleAddProduct())}>
        <ListItemIcon>
          <AddCircleIcon
            color={dashboard.addProduct ? `secondary` : "inherit"}
            fontSize={dashboard.addProduct ? "large" : "medium"}
          />
        </ListItemIcon>
        <ListItemText
          primary='Add a Product'
          disableTypography
          sx={{
            fontSize: dashboard.addProduct ? "1.3rem" : "1rem",
            color: dashboard.addProduct ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
    </React.Fragment>
  );
}

export default ListItems;
