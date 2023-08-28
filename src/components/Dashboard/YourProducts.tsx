import React from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { Product } from "./BrowseProducts";
import ListProduct from "../Products/ListProduct";
import { Box } from "@mui/material";
import { ColorRing } from "react-loader-spinner";

function YourProducts() {
  const [products, setProducts] = React.useState<Product[]>();
  const [loader, setLoader] = React.useState<boolean>(true);

  const fetchData = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL as string;
    const token: string = localStorage.getItem("token")!;
    const decodedToken: { email: string } = decodeToken<{ email: string }>(
      token
    )!;

    axios
      .get(`${backendURL}/products/users/${decodedToken.email}`)
      .then((response: { data: { documents: Product[] | [] } }) => {
        setProducts(response.data.documents);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loader ? (
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
      ) : (
        <div className='grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-20'>
          {products?.map((product: Product) => {
            return <ListProduct product={product} key={product._id} />;
          })}
        </div>
      )}
    </>
  );
}

export default YourProducts;
