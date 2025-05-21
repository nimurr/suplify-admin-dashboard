import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CheckCircleOutlined, EyeOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
 

export default function ViewStore() {
    const navigate = useNavigate()
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
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md">

      {/* Image container with red background */}
      <div className="bg-red-600 relative h-48 overflow-hidden">
        {/* Multiple bottle silhouettes to mimic the image */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4">
          <div className="flex space-x-1">
            {/* Creating multiple bottle silhouettes */}
             <img className=' object-cover h-full w-full' src="/public/image/fitness1.png" alt="" />
          </div>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-normal text-gray-600 mb-1">{product.title}</h3>
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
                    <div className="flex item-center gap-2">
                    <ArrowLeftOutlined onClick={() => navigate('/dashboard/store')} className="text-[28px] cursor-pointer"></ArrowLeftOutlined>
                    <h1  className="">Suppliment</h1>
                    </div>

                    <div>
                <button onClick={() => navigate('create-suppliment')} className='bg-[#CC2124] py-1 px-4 text-[#FFFFFF] rounded-lg'>+ Create</button>
                    </div>


</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}