import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../Dashboard/BrowseProducts";
import axios from "axios";

function SingleProduct() {
  const { id } = useParams();
  const [product, setproduct] = React.useState<Product>();

  const fetchData = async () => {
    const response: { data: Product } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/products/${id!}`
    );
    setproduct(response.data);
  };

  React.useEffect(() => {
    const initialRun = async () => {
      await fetchData();
    };
    initialRun();
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
          {/* <Link to={`/products/${id}`}> */}
          <h2 className='  mb-1 font-medium'>{product?.name}</h2>
          <h2 className=' font-thin mb-1'>{product?.description}</h2>
          <h2 className='  mb-1 font-medium'>Stock: {product?.stock}</h2>
          {/* </Link> */}
        </div>
        <div className=' text-center font-bold'> ${product?.price}</div>
      </div>
    </div>
  );
}

export default SingleProduct;
