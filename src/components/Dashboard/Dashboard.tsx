/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import Product from "../Products/ListProduct";
import ListItems from "./listItems";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import BrowseProducts from "./BrowseProducts";
import YourProducts from "./YourProducts";
import Checkout from "../Checkout/Checkout";

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href={import.meta.env.VITE_FRONTEND_URL}>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [openProfile, setOpenProfile] = React.useState(true);
  const [user, setUser] = React.useState({
    name: "",
  });
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();
  const dashboard = useSelector((state) => state.dashboard);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    const token: string = localStorage.getItem("token")!;
    setUser(decodeToken(token)!);
  }, []);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position='absolute' open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              My e-commerce App
            </Typography>
            <IconButton color='inherit'>
              <Badge color='secondary'>
                <AccountCircleIcon fontSize='large' onClick={toggleProfile} />
              </Badge>
            </IconButton>
          </Toolbar>
          <Container
            sx={{
              display: "flex",
              paddingBottom: "10px",
              justifyContent: "end",
              marginLeft: "auto",
              textAlign: "center",
              borderRadius: "5px",
              ...(openProfile && { display: "none" }),
            }}
          >
            <div className='bg-white rounded px-2  grid text-black font-thin py-3'>
              <h2 className='py-1'>{user?.name}</h2>
              <h2 className='py-1'>Profile Setting</h2>
              <button className='py-1' onClick={logout}>
                Logout
                <LogoutIcon
                  sx={{
                    marginLeft: "5px",
                  }}
                />
              </button>
            </div>
          </Container>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            <ListItems />
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {dashboard.browseProducts && (
                <Grid item xs={12} md={12} lg={12}>
                  <BrowseProducts />
                </Grid>
              )}
              {dashboard.recentOrders && (
                <Grid item xs={12} md={12} lg={12}>
                  <div className='grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-20'>
                    Recent Orders
                  </div>
                </Grid>
              )}
              {dashboard.cart && (
                <Grid item xs={12} md={12} lg={12}>
                  <Checkout />
                </Grid>
              )}
              {dashboard.yourProducts && (
                <Grid item xs={12} md={12} lg={12}>
                  <YourProducts />
                </Grid>
              )}
              {dashboard.addProduct && (
                <Grid item xs={12} md={12} lg={12}>
                  <AddProduct />
                  {/* <div className='grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-20'>
                    Add a product
                  </div> */}
                </Grid>
              )}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
