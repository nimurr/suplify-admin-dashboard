import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CheckCircleOutlined, EyeOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGetAllSupplimentsQuery } from '../../../redux/features/Store/Store';
import { FaArrowLeft } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { AiOutlinePlusCircle } from 'react-icons/ai';


export default function ViewStore() {
  const navigate = useNavigate()
  const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
  const { data } = useGetAllSupplimentsQuery(id);
  const fullData = data?.data?.attributes?.results || [];
  console.log(fullData);

  const [products] = useState([
    {
      id: 1,
      title: "Healthy Supplement",
      price: 250,
      description: "Premium quality formula designed for maximum effectiveness. Perfect for daily use and balanced nutrition.",
      image: "/public/image/fitness1.png"
    },
    {
      id: 2,
      title: "Healthy Supplement",
      price: 250,
      description: "Premium quality formula designed for maximum effectiveness. Perfect for daily use and balanced nutrition.",
      image: "/public/image/fitness1.png"
    },
    {
      id: 3,
      title: "Healthy Supplement",
      price: 250,
      description: "Premium quality formula designed for maximum effectiveness. Perfect for daily use and balanced nutrition.",
      image: "/public/image/fitness1.png"
    },
    {
      id: 4,
      title: "Healthy Supplement",
      price: 250,
      description: "Premium quality formula designed for maximum effectiveness. Perfect for daily use and balanced nutrition.",
      image: "/public/image/fitness1.png"
    },
    {
      id: 5,
      title: "Healthy Supplement",
      price: 250,
      description: "Premium quality formula designed for maximum effectiveness. Perfect for daily use and balanced nutrition.",
      image: "/public/image/fitness1.png"
    },
    {
      id: 6,
      title: "Healthy Supplement",
      price: 250,
      description: "Premium quality formula designed for maximum effectiveness. Perfect for daily use and balanced nutrition.",
      image: "/public/image/fitness1.png"
    },
    {
      id: 7,
      title: "Healthy Supplement",
      price: 250,
      description: "Premium quality formula designed for maximum effectiveness. Perfect for daily use and balanced nutrition.",
      image: "/public/image/fitness1.png"
    },
    {
      id: 8,
      title: "Healthy Supplement",
      price: 250,
      description: "Premium quality formula designed for maximum effectiveness. Perfect for daily use and balanced nutrition.",
      image: "/public/image/fitness1.png"
    }
  ]);

  // Product card component
  const ProductCard = ({ product }) => (
    <div className="border border-[#eee] rounded-lg ">

      {/* Creating multiple bottle silhouettes */}
      <img className='w-full h-auto' src="/public/image/fitness1.png" alt="" />

      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold capitalize text-gray-600 mb-1">{product.name}</h3>
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-lg">${product.price}</p>
          <button className="bg-red-600 text-white p-1 rounded-sm">
            <ShoppingCart size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-500 line-clamp-3">{product.description}</p>
        <a href="#" className="text-xs text-blue-600 mt-1">Learn more</a>
      </div>
    </div>
  );

  return (
    <div className=" mx-auto p-4">
      <div className="flex item-center justify-between gap-2 my-4">
        <div onClick={() => navigate('/dashboard/store')} className="flex cursor-pointer item-center gap-2">
          <FaArrowLeft className="text-[22px] "></FaArrowLeft>
          <h1 className="font-semibold">Suppliment</h1>
        </div>

        <div>
          <button onClick={() => navigate('create-suppliment')} className='bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg py-2 px-8 rounded-lg font-semibold flex items-center gap-1'> <AiOutlinePlusCircle className='text-xl' />Create New</button>
        </div>


      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fullData?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}