import * as React from "react";
import {
  styled,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Grid,
  Badge,
  Container,
  Link,
  Toolbar,
  Typography,
  List,
  Divider,
  IconButton,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

import ListItems, { storeType } from "./listItems";
import AddProduct from "./AddProduct";
import BrowseProducts from "./BrowseProducts";
import YourProducts from "./YourProducts";
import Checkout from "../Checkout/Checkout";
import { addSpecificAmount } from "../../features/store/storeSlice";

function Copyright(props: {
  sx: {
    pt: number;
  };
}) {
  const backendURL = import.meta.env.VITE_BACKEND_URL as string;

  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href={backendURL}>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

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

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [loader, setLoader] = React.useState(true);
  const [openProfile, setOpenProfile] = React.useState(true);
  const [user, setUser] = React.useState({
    name: "",
  });
  const backendURL = import.meta.env.VITE_BACKEND_URL as string;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const store = useSelector<storeType, storeType>((state) => state);

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
    } else {
      const token: string = localStorage.getItem("token")!;
      setUser(decodeToken(token)!);
      const fetchCart = async () => {
        const token: string = localStorage.getItem("token")!;
        const decodedToken: { email: string } = decodeToken<{ email: string }>(
          token
        )!;
        const response: { data: { items: [] } } = await axios.get(
          `${backendURL}/cart/email/${decodedToken.email}`
        );
        console.log(response);
        dispatch(addSpecificAmount(response.data.items.length));
        setLoader(false);
      };
      fetchCart();
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      {loader && (
        <Box className=' flex justify-center items-center h-[750px]'>
          <ColorRing
            visible={true}
            height='180'
            width='180'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={["#1976d2", "#1976d2", "#1976d2", "#1976d2", "#1976d2"]}
          />
        </Box>
      )}
      {!loader && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position='absolute' open={open}>
            <Toolbar
              sx={{
                pr: "24px",
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
                {store.dashboard.browseProducts && (
                  <Grid item xs={12} md={12} lg={12}>
                    <BrowseProducts />
                  </Grid>
                )}
                {store.dashboard.recentOrders && (
                  <Grid item xs={12} md={12} lg={12}>
                    <div className='grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-20'>
                      Recent Orders
                    </div>
                  </Grid>
                )}
                {store.dashboard.cart && (
                  <Grid item xs={12} md={12} lg={12}>
                    <Checkout />
                  </Grid>
                )}
                {store.dashboard.yourProducts && (
                  <Grid item xs={12} md={12} lg={12}>
                    <YourProducts />
                  </Grid>
                )}
                {store.dashboard.addProduct && (
                  <Grid item xs={12} md={12} lg={12}>
                    <AddProduct />
                  </Grid>
                )}
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
