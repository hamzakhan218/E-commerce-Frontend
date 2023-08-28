import React from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { Product } from "./BrowseProducts";
import ListProduct from "../Products/ListProduct";

function YourProducts() {
  const [products, setProducts] = React.useState<Product[]>();

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
      })
      .catch((error) => {
        console.log(error);
      });
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
