import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BsEyeFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Product } from "../Dashboard/BrowseProducts";
import { addItem } from "../../features/store/storeSlice.js";

const ListProduct = (product: { product: Product }) => {
  const {
    name,
    description,
    category,
    price,
    stock,
    image,
    _id,
    reviews,
    ownerEmail,
    publishDate,
  } = product.product;

  const dispatch = useDispatch();

  const addToCart = async () => {
    const token: string = localStorage.getItem("token")!;
    const decodedToken: { email: string } = decodeToken<{ email: string }>(
      token
    )!;
    const backendURL = import.meta.env.VITE_BACKEND_URL as string;

    const doesCartExists: {
      data: {
        ownerEmail: string;
        items: [];
        _id: string;
      };
    } = await axios.get(`${backendURL}/cart/email/${decodedToken.email}`);

    if (doesCartExists.data) {
      const data = {
        ownerEmail: doesCartExists.data.ownerEmail,
        items: [
          ...doesCartExists.data.items,
          {
            product: {
              name,
              description,
              category,
              price,
              stock,
              image,
              _id,
              reviews,
              ownerEmail,
              publishDate,
            },
            quantity: 1,
          },
        ],
      };
      await axios.put(`${backendURL}/cart/${doesCartExists.data._id}`, data);
    } else {
      await axios.post(`${backendURL}/cart`, {
        ownerEmail: decodedToken.email,
        items: [
          {
            product: {
              name,
              description,
              category,
              price,
              stock,
              image,
              _id,
              reviews,
              ownerEmail,
              publishDate,
            },
            quantity: 1,
          },
        ],
      });
    }

    dispatch(addItem());
  };

  return (
    <div className='outline rounded-2xl hover:shadow-3xl'>
      <div className='border border-[#e4e4e4] rounded-2xl h-[300px] mb-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex items-center justify-center'>
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <img
              className='h-full  group-hover:scale-110 transition duration-300'
              src={image}
              alt='product'
            />
          </div>
          <div className='absolute top-6 -right-11 group-hover:right-5 bg-red-500/40 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
            <button
              onClick={() => {
                addToCart()
                  .then(() => {
                    toast.success("Item added to cart.");
                  })
                  .catch(() => {
                    toast.warning("Item not added");
                  });
              }}
            >
              <div className='flex justify-center items-center text-white  w-12 h-12 bg-red-500'>
                <AddCircleIcon />
              </div>
            </button>
            <Link
              to={`/product/${_id}`}
              className='w-12 h-12 bg-white  flex justify-center items-center text-primary drop-shadow-xl'
            >
              <BsEyeFill />
            </Link>
          </div>
        </div>
      </div>
      <div className='mx-5'>
        <div className='underline text-sm text-center capitalize text-gray-500 mb-1'>
          {category}
        </div>
        <div className='text-sm font-thin'>
          <Link to={`/product/${_id}`}>
            <h2 className='  mb-1 font-medium'>{name}</h2>
            {/* <h2 className=' font-thin mb-1'>{description}</h2> */}
            <h2 className='  mb-1 font-medium'>Stock: {stock}</h2>
          </Link>
        </div>
        <div className=' text-center font-bold'> ${price}</div>
      </div>
    </div>
  );
};

export default ListProduct;
