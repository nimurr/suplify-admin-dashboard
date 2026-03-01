// import { useState } from 'react';
// import { ShoppingCart } from 'lucide-react';
// import { CheckCircleOutlined, EyeOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { useGetAllSupplimentsQuery } from '../../../redux/features/Store/Store';
// import { FaArrowLeft } from 'react-icons/fa6';
// import { FiPlus } from 'react-icons/fi';
// import { AiOutlinePlusCircle } from 'react-icons/ai';
// import { MdOutlineDeleteForever } from 'react-icons/md';
// import toast, { Toaster } from 'react-hot-toast';
// import { useDeleteBookedLavTestMutation } from '../../../redux/features/BookedLavTest/BookedLavTest';


// export default function ViewStore() {
//   const navigate = useNavigate()
//   const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   const { data } = useGetAllSupplimentsQuery({ category: id, page , limit });
//   const fullData = data?.data?.attributes?.results || [];
//   console.log(fullData);


//   const [deleteBooklabItem] = useDeleteBookedLavTestMutation();

//   const handleDeleteItem = async (product) => {
//     console.log("Deleting product:", product._ProductId);
//     const data = {
//       id: product._ProductId
//     };

//     try {
//       const res = await deleteBooklabItem({ data }).unwrap();
//       console.log(res);
//       if (res.code == 200) {
//         // Implement delete functionality here
//         toast.success(`Deleted product: ${product.name}`);
//       } else {
//         toast.error(res?.message || "Failed to delete product");
//       }

//     } catch (error) {
//       console.error("Error deleting product:", error);
//       toast.error(error?.data?.message || "Failed to delete product");
//     }


//   }

//   // Product card component
//   const ProductCard = ({ product }) => (
//     <div className="border border-[#eee] relative rounded-lg ">

//       <div onClick={() => handleDeleteItem(product)} className='bg-primaryBg h-8 w-8 absolute top-1 right-1 flex cursor-pointer border border-[red] items-center justify-center rounded-full '>
//         <MdOutlineDeleteForever className='text-[red] text-2xl' />
//       </div>

//       {/* Creating multiple bottle silhouettes */}
//       <img className='w-full h-60 ' src={product.attachments[0]?.attachment} alt="" />

//       {/* Product info */}
//       <div className="p-4 flex flex-col flex-grow">
//         <h3 className="text-sm font-semibold capitalize text-gray-600 mb-1">{product.name}</h3>
//         <div className="flex justify-between items-center mb-2">
//           <p className="font-bold text-lg">${product.price}</p>
//           <button className="bg-red-600 text-white p-1 rounded-sm">
//             <ShoppingCart size={16} />
//           </button>
//         </div>
//         <p className="text-xs text-gray-500 line-clamp-3">{product.description?.length > 100 ? product.description.slice(0, 100) + "  learn more..." : product.description}</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className=" mx-auto p-4">
//       <Toaster />
//       <div className="flex item-center justify-between gap-2 my-4">
//         <div onClick={() => navigate('/dashboard/store')} className="flex cursor-pointer item-center gap-2">
//           <FaArrowLeft className="text-[22px] "></FaArrowLeft>
//           <h1 className="font-semibold capitalize">{id}</h1>
//         </div>

//         <div>
//           <button onClick={() => navigate(`create-suppliment?id=${id}`)} className='bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg py-2 px-8 rounded-lg font-semibold flex items-center gap-1'> <AiOutlinePlusCircle className='text-xl' />Create New</button>
//         </div>

//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-4">
//         {fullData?.map(product => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { useGetAllSupplimentsQuery } from '../../../redux/features/Store/Store';
import { useDeleteBookedLavTestMutation } from '../../../redux/features/BookedLavTest/BookedLavTest';

export default function ViewStore() {
  const navigate = useNavigate();
  const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, refetch } = useGetAllSupplimentsQuery({ category: id, page, limit });
  const fullData = data?.data?.attributes?.results || [];
  const totalPages = data?.data?.attributes?.totalPages || 1;

  const [deleteBooklabItem] = useDeleteBookedLavTestMutation();

  const handleDeleteItem = async (product) => {
    const data = { id: product._ProductId };
    try {
      const res = await deleteBooklabItem({ data }).unwrap();
      if (res.code === 200) {
        toast.success(`Deleted product: ${product.name}`);
        refetch(); // Refresh the product list after deletion
      } else {
        toast.error(res?.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  // Product card component
  const ProductCard = ({ product }) => (
    <div className="border border-[#eee] relative rounded-lg ">
      <div
        onClick={() => handleDeleteItem(product)}
        className="bg-primaryBg h-8 w-8 absolute top-1 right-1 flex cursor-pointer border border-[red] items-center justify-center rounded-full"
      >
        <MdOutlineDeleteForever className="text-[red] text-2xl" />
      </div>

      <img className="w-full h-60" src={product.attachments[0]?.attachment} alt="" />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold capitalize text-gray-600 mb-1">{product.name}</h3>
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-lg">${product.price}</p>
          {/* <button className="bg-red-600 text-white p-1 rounded-sm">
            <ShoppingCart size={16} />
          </button> */}
        </div>
        <p className="text-xs text-gray-500 line-clamp-3">
          {product.description?.length > 100
            ? product.description.slice(0, 100) + "  learn more..."
            : product.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto p-4">
      <Toaster />
      <div className="flex items-center justify-between gap-2 my-4">
        <div
          onClick={() => navigate('/dashboard/store')}
          className="flex cursor-pointer items-center gap-2"
        >
          <FaArrowLeft className="text-[22px]" />
          <h1 className="font-semibold capitalize">{id}</h1>
        </div>

        <div>
          <button
            onClick={() => navigate(`create-suppliment?id=${id}`)}
            className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg py-2 px-8 rounded-lg font-semibold flex items-center gap-1"
          >
            <AiOutlinePlusCircle className="text-xl" />
            Create New
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-4">
        {fullData?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-[#ff09099f] rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-[#ff09099f] rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};