import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useCreateSupplimentMutation } from '../../../redux/features/Store/Store';

export default function SupplementCreateForm() {
  const { id } = Object.fromEntries(new URLSearchParams(window.location.search)); // Extract the `id` from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    attachments: '', // For storing file path or file object
    price: '', // Set initial value as empty string
    description: '',
    category: id || '', // Use the `id` from URL or set an empty string if not available
    stockQuantity: '', // Set initial value as empty string
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle photo file change
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        attachments: file, // Store the file in the formData state
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [createSuppliment] = useCreateSupplimentMutation(); // Placeholder for the mutation hook

  // Handle form submission
  const handleSubmit = async () => {
    console.log(formData);

    const formData2 = new FormData();
    formData2.append('name', formData.name);
    formData2.append('price', formData.price);
    formData2.append('description', formData.description);
    formData2.append('category', formData.category);
    formData2.append('attachments', formData.attachments);
    formData2.append('stockQuantity', formData.stockQuantity);

    try {
      const res = await createSuppliment(formData2).unwrap();
      console.log(res);
      if (res.code === 200) {
        toast.success('Supplement created successfully!');
        // navigate(`/dashboard/store/view-store?id=${formData.category}`);
        formData.name = '';
        formData.price = '';
        formData.description = '';
        formData.attachments = '';
        formData.stockQuantity = '';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create supplement. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white px-8 py-5 rounded-lg shadow-sm">
      <Toaster />
      <h1 className="text-xl capitalize font-medium mb-10 flex items-center gap-2">
        <FaArrowLeft onClick={() => navigate(`/dashboard/store/view-store?id=${id}`)} className="text-[28px] cursor-pointer" />
        Create {id}
      </h1>

      <div className="border border-[#eee] p-3 rounded-lg">
        {/* Photo (Attachment) Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Photo</label>

          <div className="flex items-start">
            <div className="mr-4">
              <label className="cursor-pointer">
                <div className="w-40 h-40 border border-dashed border-[#cfcfcf] rounded flex flex-col items-center justify-center bg-gray-50">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="text-gray-400 mb-2" size={24} />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>

            <div>
              <button
                type="button"
                className="px-4 py-2 border border-[#eee] rounded bg-white text-sm text-gray-700 hover:bg-gray-50"
              >
                Upload Photo
              </button>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
            Name <span className="text-[red]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Type Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#eee] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">
            Price <span className="text-[red]">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="$ 250"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#eee] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {
          id !== "labTest" &&
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">
              Stock Quantity <span className="text-[red]">*</span>
            </label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              placeholder="Type Stock Quantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[#eee] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        }

        {/* Description */}
        <div className="mb-8">
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
            Description <span className="text-[red]">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder='Enter Your Description Here...'
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#eee] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="px-8 py-2 w-full bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Create
        </button>
      </div>
    </div>
  );
}