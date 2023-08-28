import * as React from "react";
import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { Product } from "../Dashboard/BrowseProducts";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  const [products, setProducts] = React.useState([]);
  const [amount, setAmount] = React.useState<number>(0);
  const [loader, setLoader] = React.useState<boolean>(true);

  const fetchData = () => {
    const token: string = localStorage.getItem("token")!;
    const decodedToken: { email: string } = decodeToken<{ email: string }>(
      token
    )!;
    const backendURL = import.meta.env.VITE_BACKEND_URL as string;

    axios
      .get(`${backendURL}/cart/email/${decodedToken.email}`)
      .then((response: { data: { document: { items: [] } } }) => {
        if (response.data.document) {
          let totalAmount = 0;
          response.data.document.items.map(
            (product: { product: { price: number } }) => {
              totalAmount += product.product.price;
            }
          );
          setAmount(totalAmount);
          setProducts(response.data.document?.items);
        }

        setLoader(false);
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {loader ? (
          <>
            <div className='relative flex w-auto animate-pulse gap-2 p-4'>
              <div className='h-12 w-12 rounded-full bg-slate-400'></div>
              <div className='flex-1'>
                <div className='mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg'></div>
                <div className='h-5 w-[90%] rounded-lg bg-slate-400 text-sm'></div>
              </div>
              <div className='absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400'></div>
            </div>
            <div className='relative flex w-auto animate-pulse gap-2 p-4'>
              <div className='h-12 w-12 rounded-full bg-slate-400'></div>
              <div className='flex-1'>
                <div className='mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg'></div>
                <div className='h-5 w-[90%] rounded-lg bg-slate-400 text-sm'></div>
              </div>
              <div className='absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400'></div>
            </div>
          </>
        ) : (
          products.map((product: { product: Product }, key) => (
            <ListItem key={key} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={product.product.name} />
              <Typography variant='body2'>${product.product.price}</Typography>
            </ListItem>
          ))
        )}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            ${amount}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction='column' xs={12} sm={6}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
