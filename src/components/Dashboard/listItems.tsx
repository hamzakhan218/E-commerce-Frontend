/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddProduct,
  toggleBrowseProducts,
  toggleCart,
  toggleRecentOrders,
  toggleYourProducts,
} from "../../features/dashboard/dashboardSlice";

export type storeType = {
  dashboard: {
    recentOrders: boolean;
    cart: boolean;
    browseProducts: boolean;
    yourProducts: boolean;
    addProduct: boolean;
  };
  cart: {
    numberOfItems: number;
  };
};

function ListItems() {
  const dispatch = useDispatch();
  const store: storeType = useSelector<storeType, storeType>((state) => state);

  return (
    <React.Fragment>
      <ListItemButton onClick={() => dispatch(toggleRecentOrders())}>
        <ListItemIcon>
          <ReceiptLongIcon
            color={store.dashboard.recentOrders ? `secondary` : "inherit"}
            fontSize={store.dashboard.recentOrders ? "large" : "medium"}
          />
        </ListItemIcon>
        <ListItemText
          primary='Recent Orders'
          disableTypography
          sx={{
            fontSize: store.dashboard.recentOrders ? "1.3rem" : "1rem",
            color: store.dashboard.recentOrders ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => dispatch(toggleCart())}>
        <ListItemIcon>
          <Badge color='primary' badgeContent={store.cart.numberOfItems}>
            <ShoppingCartIcon
              color={store.dashboard.cart ? `secondary` : "inherit"}
              fontSize={store.dashboard.cart ? "large" : "medium"}
            />
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary='Cart'
          disableTypography
          sx={{
            fontSize: store.dashboard.cart ? "1.3rem" : "1rem",
            color: store.dashboard.cart ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => dispatch(toggleBrowseProducts())}>
        <ListItemIcon>
          <CategoryIcon
            color={store.dashboard.browseProducts ? "secondary" : "inherit"}
            fontSize={store.dashboard.browseProducts ? "large" : "medium"}
          />
        </ListItemIcon>
        <ListItemText
          primary='Browse Products'
          disableTypography
          sx={{
            fontSize: store.dashboard.browseProducts ? "1.3rem" : "1rem",
            color: store.dashboard.browseProducts ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => dispatch(toggleYourProducts())}>
        <ListItemIcon>
          <InventoryIcon
            color={store.dashboard.yourProducts ? `secondary` : "inherit"}
            fontSize={store.dashboard.yourProducts ? "large" : "medium"}
          />
        </ListItemIcon>
        <ListItemText
          primary='Your Products'
          disableTypography
          sx={{
            fontSize: store.dashboard.yourProducts ? "1.3rem" : "1rem",
            color: store.dashboard.yourProducts ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => dispatch(toggleAddProduct())}>
        <ListItemIcon>
          <AddCircleIcon
            color={store.dashboard.addProduct ? `secondary` : "inherit"}
            fontSize={store.dashboard.addProduct ? "large" : "medium"}
          />
        </ListItemIcon>
        <ListItemText
          primary='Add a Product'
          disableTypography
          sx={{
            fontSize: store.dashboard.addProduct ? "1.3rem" : "1rem",
            color: store.dashboard.addProduct ? "#9C27B0" : "inherit",
          }}
        />
      </ListItemButton>
    </React.Fragment>
  );
}

export default ListItems;
