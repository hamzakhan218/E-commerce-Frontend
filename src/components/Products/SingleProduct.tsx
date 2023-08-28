import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Product } from "../Dashboard/BrowseProducts";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = React.useState<Product>();
  const backendURL = import.meta.env.VITE_BACKEND_URL as string;

  const fetchData = () => {
    axios
      .get(`${backendURL}/products/${id!}`)
      .then(
        (response: {
          data: {
            document: Product;
          };
        }) => {
          setProduct(response.data.document);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchData();
  });

  return (
    <div className='outline '>
      <div className='border border-[#e4e4e4] h-[500px] w-full flex justify-center mb-4 relative overflow-hidden group transition'>
        <div className='md:w-2/5 sm:w-1/2 w-auto h-auto flex items-center justify-center'>
          <div className='w-auto  h-auto mx-auto flex justify-center items-center'>
            <img
              className='h-auto  group-hover:scale-110 transition duration-300'
              src={product?.image}
              alt='product'
            />
          </div>
        </div>
      </div>
      <div className='mx-5'>
        <div className='underline text-sm text-center capitalize text-gray-500 mb-1'>
          {product?.category}
        </div>
        <div className='text-sm font-thin'>
          <h2 className='  mb-1 font-medium'>{product?.name}</h2>
          <h2 className=' font-thin mb-1'>{product?.description}</h2>
          <h2 className='  mb-1 font-medium'>Stock: {product?.stock}</h2>
        </div>
        <div className=' text-center font-bold'> ${product?.price}</div>
      </div>
    </div>
  );
}

export default SingleProduct;
