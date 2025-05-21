import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { CheckCircleOutlined, EyeOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
export default function SupplementCreateForm() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: 'Description for this item is very important for the user, they have to know in details of the item',
    photo: null
  });
  
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        photo: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-2xl font-medium mb-4">
      <ArrowLeftOutlined onClick={() => navigate('/dashboard/store/view-store')} className="text-[28px] cursor-pointer"></ArrowLeftOutlined>
         Healthy Supplement</h1>
      <hr className="border-gray-200 mb-6" />
      
      <div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Photo
          </label>
          
          <div className="flex items-start">
            <div className="mr-4">
              <label className="cursor-pointer">
                <div className="w-40 h-40 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center bg-gray-50">
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
                className="px-4 py-2 border border-gray-300 rounded bg-white text-sm text-gray-700 hover:bg-gray-50"
              >
                Upload Photo
              </button>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG or PDF up to 10MB
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Type Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="$ 250"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-8">
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <button
          onClick={handleSubmit}
          className="px-8 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Create
        </button>
      </div>
    </div>
  );
}