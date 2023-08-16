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
import ImageUploader, { FileObjectType } from "react-image-upload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "react-toastify/dist/ReactToastify.css";
import "react-image-upload/dist/index.css";

const defaultTheme = createTheme();

function AddProduct() {
  const [fileUploadStatus, setFileUploadStatus] = React.useState(true);
  const [file, setFile] = React.useState<string>();
  const [date, setDate] = React.useState<Date | null>(null);
  const [progress, setProgress] = React.useState<number>(0);

  async function getImageFileObject(imageFile: { file: File }) {
    try {
      const formData = new FormData();
      formData.append("file", imageFile.file);

      const response: {
        data: {
          value: {
            cid: string;
            files: {
              name: string;
            }[];
          };
        };
      } = await axios.post("https://api.nft.storage/upload", formData, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE2ZGI0NjViQkY0OUMwYTEzNTE3MzgyOTNhN0IzOEQ1OGI4NjI3ODAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDcxNTUzNDQ0MywibmFtZSI6InRlem9zIn0.gjIvn3WJvw2KxsWXOWCzXCMv8rixUAQSuB-MJYVxi9A",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded * 100) / total!);
          setProgress(progress);
        },
      });

      const filePath: string =
        "https://ipfs.io/ipfs/" +
        response.data.value.cid +
        "/" +
        response.data.value.files[0].name;
      setFile(filePath);
      setFileUploadStatus(!fileUploadStatus);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = new FormData(event.currentTarget);
    const token: string = localStorage.getItem("token")!;
    const decodedToken: { email: string } = decodeToken<{ email: string }>(
      token
    )!;
    const backendURL = import.meta.env.VITE_BACKEND_URL as string;

    const data = {
      name: res.get("name"),
      price: parseInt(res.get("price")),
      image: file,
      publishDate: date,
      ownerEmail: decodedToken.email,
      description: res.get("description"),
      category: res.get("category"),
      stock: parseInt(res.get("stock")),
    };

    axios
      .post(`${backendURL}/products`, data)
      .then((res) => {
        toast.success(res.statusText);
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
            <AddCircleIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Add a Product
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  name='name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='price'
                  label='Price'
                  type='number'
                  id='price'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='category'
                  label='Category'
                  id='category'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='stock'
                  label='Stock'
                  type='number'
                  id='stock'
                />
              </Grid>
            </Grid>
            <TextField
              margin='normal'
              required
              fullWidth
              name='description'
              label='Description'
              id='description'
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ImageUploader
                  onFileAdded={async (img: { file: FileObjectType }) =>
                    await getImageFileObject(img)
                  }
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
              disabled={fileUploadStatus}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddProduct;
