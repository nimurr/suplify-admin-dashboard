import React, { useState } from 'react';
import { Modal, Button, Input, Card, message, Space, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([
        { subscriptionName: "Standard", amount: "70", subscriptionType: "standard" },
        { subscriptionName: "Standard Plus", amount: "150", subscriptionType: "standardPlus" },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newSubscription, setNewSubscription] = useState({ subscriptionName: "", amount: "", subscriptionType: "" });

    const handleAddSubscription = () => {
        if (!newSubscription.subscriptionName || !newSubscription.amount || !newSubscription.subscriptionType) {
            message.error("Please fill in all fields.");
            return;
        }
        setSubscriptions([...subscriptions, newSubscription]);
        setIsModalVisible(false);
        setNewSubscription({ subscriptionName: "", amount: "", subscriptionType: "" });
    };

    const handleDeleteSubscription = (subscriptionName) => {
        setSubscriptions(subscriptions.filter((sub) => sub.subscriptionName !== subscriptionName));
        message.success(`Subscription ${subscriptionName} deleted successfully.`);
    };

    const handleChange = (e) => {
        setNewSubscription({
            ...newSubscription,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div >
            <div className='flex items-center justify-between my-5'>
                <h2 className='font-semibold'>Subscriptions</h2>
                <Button
                    type="primary"
                    onClick={() => setIsModalVisible(true)}
                    style={{ marginTop: '20px' }}
                    className='h-12 px-8 bg-gradient-to-br from-[#be70f8] to-[#f76776]  text-primaryBg'
                >
                    Add Subscription
                </Button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {subscriptions.map((subscription, index) => (
                    <Card key={index} style={{ width: 300 }} >
                        <h2 className='my-3 font-semibold'>Subscription Type: {subscription.subscriptionType}</h2>
                        <Card.Meta title={subscription.subscriptionName} description={`Amount: $${subscription.amount}`} />
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteSubscription(subscription.subscriptionName)}
                            style={{ position: 'absolute', top: '10px', right: '10px' }}
                        />
                    </Card>
                ))}
            </div>


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
                        value={newSubscription.amount}
                        onChange={handleChange}
                        className=' h-12'
                    />
                    {/* standard-standardPlus-vise */}
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