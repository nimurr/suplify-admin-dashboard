import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Card, message, Space, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useGetSubscriptionQuery, useDeleteSubscriptionMutation, useAddSubscriptionMutation } from '../../redux/features/subscription/subscription';
import { IoAddOutline } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';

const Subscription = () => {
    // Fetch the subscription data from the API
    const { data, isLoading } = useGetSubscriptionQuery();
    const fullData = data?.data?.attributes?.results;

    // State to hold the subscriptions
    const [subscriptions, setSubscriptions] = useState([]);

    // Modal and input states for adding new subscription
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newSubscription, setNewSubscription] = useState({ subscriptionName: "", amount: "", subscriptionType: "" });

    // Update subscriptions when data is fetched
    useEffect(() => {
        if (!isLoading && fullData) {
            setSubscriptions(fullData);
        }
    }, [fullData, isLoading]);

    const [addSubscription] = useAddSubscriptionMutation();

    const handleAddSubscription = async () => {
        if (!newSubscription.subscriptionName || !newSubscription.amount || !newSubscription.subscriptionType) {
            message.error("Please fill in all fields.");
            return;
        }

        const data = {
            subscriptionName: newSubscription.subscriptionName,
            amount: newSubscription.amount,
            subscriptionType: newSubscription.subscriptionType
        };

        try {
            const res = await addSubscription(data).unwrap();
            console.log(res);
            if (res.code == 200) {
                toast.success(res?.message || 'Subscription Added Successfully');
                setNewSubscription({ subscriptionName: "", amount: "", subscriptionType: "" });
                setIsModalVisible(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong');
        }


        // setSubscriptions([...subscriptions, newSubscription]);
    };

    const [deleteSubscription] = useDeleteSubscriptionMutation();

    const handleDeleteSubscription = async (subscription) => {
        const data = {
            isActive: false,
        }

        try {
            const res = await deleteSubscription({ id: subscription?._subscriptionId, data }).unwrap();
            if (res?.code == 200) {
                toast.success(res?.message || 'Subscription Deleted Successfully');
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong');
        }

    };

    const handleChange = (e) => {
        setNewSubscription({
            ...newSubscription,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <Toaster />
            <div className='flex items-center justify-between my-5'>
                <h2 className='font-semibold text-2xl'>Subscriptions</h2>
                <Button
                    type="primary"
                    onClick={() => setIsModalVisible(true)}
                    icon={<IoAddOutline className='text-2xl' />}
                    className='h-12 px-8 bg-gradient-to-br hover:bg-gradient-to-br border-none from-[#be70f8] to-[#f76776] text-primaryBg'
                >
                    Add Subscription
                </Button>
            </div>
            {isLoading && <h2>Loading...</h2>}
            <div className='grid xl:grid-cols-5  lg:grid-cols-3 sm:grid-cols-2 gap-5'>
                {/* Display the subscriptions */}
                {subscriptions?.map((subscription, index) => (
                    <div key={index} className="relative bg-[#ffeeee] w-full p-4 rounded-lg shadow-lg">
                        <div className="font-medium text-lg inline bg-[#003380] text-primaryBg p-2 text-center rounded-lg mt-8">{subscription.subscriptionName}</div>
                        <h2 className="my-3 font-semibold text-xl">Type : {subscription.subscriptionType}</h2>
                        <p className="text-gray-600">Amount: ${subscription.amount}</p>

                        {/* Delete Button */}
                        <button
                            // disabled 
                            disabled
                            onClick={() => handleDeleteSubscription(subscription)}
                            className="absolute top-2 right-2 text-red-500 p-2 hover:bg-red-200 rounded-full"
                        >
                            <DeleteOutlined />
                        </button>
                    </div>
                ))}

            </div>

            {/* Modal for Adding New Subscription */}
            <Modal
                title="Add New Subscription"
                visible={isModalVisible}
                onOk={handleAddSubscription}
                onCancel={() => setIsModalVisible(false)}
                okText="Add"
                cancelText="Cancel"
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Input
                        name="subscriptionName"
                        placeholder="Subscription Name"
                        value={newSubscription.subscriptionName}
                        onChange={handleChange}
                        className=' h-12'
                    />
                    <Input
                        name="amount"
                        placeholder="Amount"
                        type="number"
                        value={newSubscription.amount}
                        onChange={handleChange}
                        className=' h-12'
                    />
                    {/* Subscription Type Selector */}
                    <Select
                        name="subscriptionType"
                        placeholder="Subscription Type"
                        value={newSubscription.subscriptionType}
                        className='w-full h-12'
                        onChange={(value) => setNewSubscription({ ...newSubscription, subscriptionType: value })}
                    >
                        <Select.Option value="standard">Standard</Select.Option>
                        <Select.Option value="standardPlus">Standard Plus</Select.Option>
                        <Select.Option value="vise">Vise</Select.Option>
                    </Select>
                </Space>
            </Modal>
        </div>
    );
};

export default Subscription;