import { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSingleGetSupplimentQuery, useUpdateSupplimentItemMutation } from '../../../redux/features/Store/Store';

export default function SupplementUpdateForm() {
    const { category } = Object.fromEntries(new URLSearchParams(window.location.search));
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, refetch } = useSingleGetSupplimentQuery(id);
    const fullProduct = data?.data?.attributes;

    const [formData, setFormData] = useState({
        name: '',
        attachments: '',
        price: '',
        description: '',
        category: category || '',
        stockQuantity: '',
    });


    useEffect(() => {
        if (!fullProduct) return;
        setFormData({
            name: fullProduct?.name,
            attachments: fullProduct?.attachments[0].attachment,
            price: fullProduct?.price,
            description: fullProduct?.description,
            category: category || '',
            stockQuantity: fullProduct?.stockQuantity,
        });
    }, [fullProduct]);

    const [photoPreview, setPhotoPreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, attachments: file });

            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const [updateSupplimentItem, { isLoading }] = useUpdateSupplimentItemMutation();

    const handleSubmit = async () => {
        const formData2 = new FormData();

        formData2.append('name', formData.name);
        formData2.append('price', formData.price);
        formData2.append('description', formData.description);
        formData2.append('category', formData.category);

        console.log("my send fils :-", formData.attachments)


        // ✅ Only send if it's a newly selected File, not the existing URL string
        if (formData.attachments instanceof File) {
            formData2.append('attachments', formData.attachments);
        }

        if (category !== 'labTest') {
            formData2.append('stockQuantity', formData.stockQuantity);
        }

        try {
            const res = await updateSupplimentItem({ id, data: formData2 }).unwrap();

            console.log(res)

            if (res.code === 200) {
                refetch();
                toast.success('Supplement Updated Successfully!');
                // navigate(`/dashboard/store/view-store?id=${category}`);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update supplement');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white px-8 py-5 rounded-lg shadow-sm">
            <Toaster />
            <h1 className="text-xl capitalize font-medium mb-10 flex items-center gap-2">
                <FaArrowLeft
                    onClick={() => navigate(`/dashboard/store/view-store?id=${category}`)}
                    className="text-[28px] cursor-pointer"
                />
                Update
            </h1>

            <div className="border border-[#eee] p-3 rounded-lg">
                {/* Photo Upload */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Photo</label>
                    <div className="flex items-start">
                        <div className="mr-4">
                            <label className="cursor-pointer">
                                <div className="w-40 h-40 border border-dashed border-[#cfcfcf] rounded flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
                                    {(photoPreview || formData?.attachments) ? (
                                        <img
                                            src={photoPreview || formData?.attachments}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Upload className="text-gray-400 mb-2" size={24} />
                                    )}
                                </div>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="photo-upload">
                                <span className="px-4 py-2 border border-[#eee] rounded bg-white text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                                    Upload Photo
                                </span>
                            </label>
                            <p className="text-xs text-gray-500 mt-2">PNG, JPG or PDF up to 10MB</p>
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
                        value={formData.name || ''}
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
                        value={formData.price || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#eee] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Stock Quantity */}
                {category !== 'labTest' && (
                    <div className="mb-4">
                        <label htmlFor="stockQuantity" className="block text-gray-700 text-sm font-medium mb-2">
                            Stock Quantity <span className="text-[red]">*</span>
                        </label>
                        <input
                            type="number"
                            id="stockQuantity"
                            name="stockQuantity"
                            placeholder="Type Stock Quantity"
                            value={formData.stockQuantity || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-[#eee] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                )}

                {/* Description */}
                <div className="mb-8">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                        Description <span className="text-[red]">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter Your Description Here..."
                        rows="4"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#eee] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-8 py-2 w-full bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-60"
                >
                    {isLoading ? 'Updating...' : 'Update Supplement'}
                </button>
            </div>
        </div>
    );
}