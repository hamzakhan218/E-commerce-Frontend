/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { Product } from "./BrowseProducts";
import ListProduct from "../Products/ListProduct";

function YourProducts() {
  const [products, setProducts] = React.useState<Product[]>();

  const fetchData = async () => {
    const token: string = localStorage.getItem("token")!;
    const email = decodeToken(token).email;
    const response: { data: Product[] } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/products/users/${email}`
    );
    setProducts(response.data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-20'>
      {products?.map((product: Product) => {
        return <ListProduct product={product} key={product._id} />;
      })}
    </div>
  );
}

export default YourProducts;
