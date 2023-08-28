import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props: {
  sx: {
    mt: number;
  };
}) {
  const frontendURL = import.meta.env.VITE_FRONTEND_URL as string;

  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href={frontendURL}>
        E-commerce App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL as string;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = new FormData(event.currentTarget);

    const data = {
      name: res.get("firstName"),
      email: res.get("email"),
      password: res.get("password"),
    };

    axios
      .post(`${backendURL}/users`, data)
      .then((response: { data: { insertedId: string | undefined } }) => {
        if (response.data.insertedId) {
          toast("Account created please login");
          navigate("/signin");
        } else {
          toast("Account already exists");
        }
      })
      .catch((error: { response: { data: { message: string[] } } }) => {
        toast(error.response.data.message[0]);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <button onClick={() => navigate("/signin")}>
                  <Link variant='body2'>Already have an account? Sign in</Link>
                </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
