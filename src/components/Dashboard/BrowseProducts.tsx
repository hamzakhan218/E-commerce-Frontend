import React from "react";
import Product from "../Products/ListProduct";
import axios from "axios";

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
function BrowseProducts(): Promise<Product[]> {
  const [products, setProducts] = React.useState<Product[]>([]);

  const fetchProducts = async () => {
    const response: { data: Product[] } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/products`
    );
    setProducts(response.data);
  };
  React.useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className='grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-20'>
      {products.map((product: Product) => {
        return <Product product={product} key={product._id} />;
      })}
    </div>
  );
}

export default BrowseProducts;
