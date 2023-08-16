import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BsEyeFill } from "react-icons/bs";
// import { CartContext } from "../contexts/CartContext";
import { FaBeer } from "react-icons/fa";
import { Product } from "../Dashboard/BrowseProducts";

const ListProduct = (product: { product: Product }) => {
  const {
    name,
    description,
    category,
    price,
    publishDate,
    reviews,
    stock,
    image,
    _id,
  } = product.product;
  //   const { addToCart } = useContext(CartContext);

  return (
    <div className='outline '>
      <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex items-center justify-center'>
          {/* image */}
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <img
              className='h-full group-hover:scale-110 transition duration-300'
              src={image}
              alt='product'
            />
          </div>
          <div className='absolute top-6 -right-11 group-hover:right-5 bg-red-500/40 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
            <button>
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
          {/* <Link to={`/products/${id}`}> */}
          <h2 className='  mb-1 font-medium'>{name}</h2>
          <h2 className=' font-thin mb-1'>{description}</h2>
          <h2 className='  mb-1 font-medium'>Stock: {stock}</h2>
          {/* </Link> */}
        </div>
        <div className=' text-center font-bold'> ${price}</div>
      </div>
    </div>
  );
};

export default ListProduct;
