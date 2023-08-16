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

  const fetchData = async () => {
    const token: string = localStorage.getItem("token")!;
    const decodedToken: { email: string } = decodeToken<{ email: string }>(
      token
    )!;
    const backendURL = import.meta.env.VITE_BACKEND_URL as string;

    const response: { data: { items: [] } } = await axios.get(
      `${backendURL}/cart/email/${decodedToken.email}`
    );
    let totalAmount = 0;
    response.data.items.map((product: { product: { price: number } }) => {
      totalAmount += product.product.price;
    });
    setAmount(totalAmount);
    setProducts(response.data.items);
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
        {products.map((product: { product: Product }, key) => (
          <ListItem key={key} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.product.name}
              secondary={product.product.description}
            />
            <Typography variant='body2'>${product.product.price}</Typography>
          </ListItem>
        ))}
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
