import React from "react";
import axios from "axios";

import Product from "../Products/ListProduct";
import { Box } from "@mui/material";
import { ColorRing } from "react-loader-spinner";

export type productType = {
  reviewerName: string;
  reviewerId: string;
  stars: number;
  comment: string;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  publishDate: Date;
  ownerEmail: string;
  description: string;
  category: string;
  stock: number;
  reviews: productType[];
};

function BrowseProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loader, setLoader] = React.useState<boolean>(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL as string;

  const fetchProducts = () => {
    axios
      .get(`${backendURL}/products`)
      .then((res: { data: { documents: Product[] | [] } }) => {
        setProducts(res.data.documents);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchProducts();
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
        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-20'>
          {products.map((product: Product) => {
            return <Product product={product} key={product._id} />;
          })}
        </div>
      )}
    </>
  );
}

export default BrowseProducts;
