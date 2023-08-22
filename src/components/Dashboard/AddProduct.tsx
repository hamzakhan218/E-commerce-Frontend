/* eslint-disable @typescript-eslint/no-misused-promises */
import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  LinearProgress,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useForm, SubmitHandler } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "react-toastify/dist/ReactToastify.css";
import "react-image-upload/dist/index.css";

const defaultTheme = createTheme();
type Inputs = {
  name: string;
  price: number;
  image: string;
  publishDate: Date;
  ownerEmail: string;
  description: string;
  category: string;
  stock: number;
};

function AddProduct() {
  const [file, setFile] = React.useState<string>();
  const [date, setDate] = React.useState<Date | null>(null);
  const [progress, setProgress] = React.useState<number>(0);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post("https://api.nft.storage/upload", data.image[0], {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE2ZGI0NjViQkY0OUMwYTEzNTE3MzgyOTNhN0IzOEQ1OGI4NjI3ODAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDcxNTUzNDQ0MywibmFtZSI6InRlem9zIn0.gjIvn3WJvw2KxsWXOWCzXCMv8rixUAQSuB-MJYVxi9A",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded * 100) / total!);
          setProgress(progress);
        },
      })
      .then(
        (response: {
          data: {
            value: {
              cid: string;
              files: {
                name: string;
              }[];
            };
          };
        }) => {
          const filePath: string =
            "https://ipfs.io/ipfs/" + response.data.value.cid;
          console.log(filePath);
          const token: string = localStorage.getItem("token")!;
          const decodedToken: { email: string } = decodeToken<{
            email: string;
          }>(token)!;
          const backendURL = import.meta.env.VITE_BACKEND_URL as string;
          axios
            .post(`${backendURL}/products`, {
              name: data.name,
              price: data.price,
              image: filePath,
              publishDate: data.publishDate,
              ownerEmail: decodedToken.email,
              description: data.description,
              category: data.category,
              stock: data.stock,
            })
            .then((res) => {
              toast.success(res.statusText);
            })
            .catch((error: { response: { data: { message: string[] } } }) => {
              toast(error.response.data.message[0]);
            });
        }
      )
      .catch((error) => {
        console.log(error);
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
            <AddCircleIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Add a Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <input
                  placeholder='Name'
                  className='px-5 py-4 bg-[#f5f5f5] border rounded '
                  {...register("name", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  placeholder='Price'
                  type='number'
                  className='px-5 py-4 bg-[#f5f5f5] border rounded '
                  {...register("price", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  placeholder='Category'
                  className='px-5 py-4 bg-[#f5f5f5] border rounded '
                  {...register("category", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  placeholder='Stock'
                  type='number'
                  className='px-5 py-4 bg-[#f5f5f5] border rounded '
                  {...register("stock", { required: true })}
                />
              </Grid>
            </Grid>
            <input
              placeholder='Description'
              className='px-5 py-4 bg-[#f5f5f5] border rounded '
              {...register("description", { required: true })}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <input
                  {...register("image", {
                    required: "picture is required",
                  })}
                  type='file'
                  id='picture'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(newValue: Date | null) => setDate(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <LinearProgress variant='determinate' value={progress} />
            <Box sx={{ minWidth: 35 }}>
              <Typography variant='body2' color='text.secondary'>{`${Math.round(
                progress
              )}%`}</Typography>
            </Box>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddProduct;
