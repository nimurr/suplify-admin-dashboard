import React, { useState, useEffect } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useCreateSupplimentMutation, useGetStoreItemsQuery } from '../../../redux/features/Store/Store';
import { FaPlus } from 'react-icons/fa';  // For the 'Create' button 
import { Modal, Input, Button, Form, Upload, InputNumber, Select } from 'antd';  // Importing Ant Design components
import { UploadOutlined } from '@ant-design/icons';
import toast, { Toaster } from 'react-hot-toast';

const StoreTable = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    attachments: null,
    stockQuantity: 0,
  }); // State for form data
  const [categories, setCategories] = useState([]);  // State for category list

  const { data, isLoading } = useGetStoreItemsQuery();
  const storeData = data?.data?.attributes?.counts || [];
  console.log(storeData);

  // Fetch categories (static or from API)
  useEffect(() => {
    // This could be an API call to fetch the categories.
    // For now, we'll use a static list for demonstration purposes.
    const fetchedCategories = ['labTest', 'supplement', 'wellness', 'fitness']; // Example categories
    setCategories(fetchedCategories);
  }, []);

  // Pagination logic: slice the data to show only the items for the current page
  const currentData = storeData?.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  // Handle pagination change
  const handlePaginationChange = (direction) => {
    setPagination((prev) => {
      const newPage = direction === 'next' ? prev.current + 1 : prev.current - 1;
      return {
        ...prev,
        current: newPage,
      };
    });
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload for attachments
  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      setFormData((prev) => ({
        ...prev,
        attachments: info.fileList[0].originFileObj,
      }));
    }
  };

  const [createSuppliment, { isLoading: isCreatingSuppliment }] = useCreateSupplimentMutation(); // Placeholder for the mutation hook


  // Handle form submit for creating a new product
  const handleCreateProduct = async () => {

    console.log(formData);

    const formData2 = new FormData();
    formData2.append('name', formData.name);
    formData2.append('price', formData.price);
    formData2.append('description', formData.description);
    formData2.append('category', formData.category);
    if (formData.category != "labTest") {
      formData2.append('stockQuantity', formData.stockQuantity);
    }
    formData2.append('attachments', formData.attachments);


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
        toggleModal();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create supplement. Please try again.');
    }

  };

  return (
    <div>
      <Toaster />
      <div className='flex items-center justify-between flex-wrap'>
        <h1 className="text-xl font-semibold mb-6">Store Management</h1>

        {/* Button to create a new product */}
        <button
          onClick={toggleModal}
          className="px-4 py-2 flex items-center gap-2 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg rounded mb-4"
        >
          <FaPlus className="mr-2" />
          Create New Product
        </button>
      </div>

      {/* Raw HTML Table */}
      <table border="1" className="w-full table-auto border-collapse rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg">
          <tr>
            <th className="px-4 text-center py-5">SL</th>
            <th className="px-4 text-center py-5">Category</th>
            <th className="px-4 text-center py-5">Item</th>
            <th className="px-4 text-center py-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((record, idx) => (
            <tr className="border-b border-[#ccc]" key={record.key}>
              <td className="px-4 text-center py-5">{++idx}</td>
              <td className="px-4 capitalize text-center py-5"><strong>{record._id}</strong></td>
              <td className="px-4 text-center py-5">{record.count}</td>
              <td className="px-4 text-center py-5">
                <Link to={`view-store?id=${record._id}`} className="text-blue-500 text-center flex items-center justify-center gap-1">
                  <IoEyeOutline className="text-2xl " />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoading ? (
        <div className="text-center flex items-center justify-center py-2">
          <span className="text-center py-3">Loading...</span>
        </div>
      ) : null}

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={() => handlePaginationChange('prev')}
          disabled={pagination.current === 1}
          className="px-4 py-2 bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {pagination.current} of {Math.ceil(storeData.length / pagination.pageSize)}
        </span>
        <button
          onClick={() => handlePaginationChange('next')}
          disabled={pagination.current === Math.ceil(storeData.length / pagination.pageSize)}
          className="px-4 py-2 bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal for creating new product */}
      <Modal
        title="Create New Product"
        visible={isModalOpen}
        onCancel={toggleModal}
        footer={[
          <button className='px-4 py-2 bg-[#ff0909d3] text-primaryBg rounded mr-2' key="cancel" onClick={toggleModal}>
            Cancel
          </button>,
          <button className='px-4 py-2 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg rounded' key="create" onClick={handleCreateProduct}>
            Create New {isCreatingSuppliment && <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>}
          </button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className='h-12'
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber
              name="price"
              value={formData.price}
              onChange={(value) => setFormData({ ...formData, price: value })}
              placeholder="Enter price"
              className='w-full py-2'
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className='h-12'
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              name="category"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
              placeholder="Select a category"
              className='h-12'
            >
              {categories.map((category, idx) => (
                <Select.Option className='capitalize' key={idx} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Attachments"
            name="attachments"
            valuePropName="fileList"
            getValueFromEvent={handleFileChange}
            className='w-full'
          >
            <Upload
              className='w-full h-12'
              accept="image/*"
              maxCount={1}
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="stockQuantity"
          >
            <InputNumber
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={(value) => setFormData({ ...formData, stockQuantity: value })}
              placeholder="Enter stock quantity"
              min={0}
              className='w-full py-2'
            />
            <span className='mt-2 block text-[#c00]'>You Don't have add Stock Quantity For Labtest</span>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StoreTable;
