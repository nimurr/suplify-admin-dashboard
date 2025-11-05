import React, { useState } from 'react';
import { Modal, Button, Tabs, Card, Select, Space, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useAssginSpecialistMutation, useAssignDoctorMutation, useGetDoctorsQuery, useGetUserProfileQuery, useGetYourSpecialistQuery } from '../../../redux/features/users/users';
import { useParams } from 'react-router-dom';
import url from '../../../redux/api/baseUrl';

const { TabPane } = Tabs;

const ViewProfileSpecialist = () => {
    const [isSpecialistModalVisible, setIsSpecialistModalVisible] = useState(false);
    const [isDoctorModalVisible, setIsDoctorModalVisible] = useState(false);
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedSpecialistId, setSelectedSpecialistId] = useState(null);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const { id } = useParams();
    const { data: userProfile } = useGetUserProfileQuery(id);
    const user = userProfile?.data?.attributes?.results[0];


    const { data: specialistsData } = useGetYourSpecialistQuery(id);
    const userSpecialists = specialistsData?.data?.attributes?.results;

    const { data: doctorsData } = useGetDoctorsQuery(id);
    const userDoctors = doctorsData?.data?.attributes?.results;
    console.log(userDoctors);

    const handleAssignSpecialist = () => {
        setIsSpecialistModalVisible(true);
    };

    const handleAssignDoctor = () => {
        setIsDoctorModalVisible(true);
    };

    const [assingSpecialist] = useAssginSpecialistMutation();

    const handleSpecialistOk = async () => {
        // Ensure a specialist is selected
        if (!selectedSpecialistId) {
            message.error('Please select a specialist');
            return;
        }

        const data = {
            patientId: id,
            specialistId: selectedSpecialistId,
        };

        try {
            const res = await assingSpecialist(data).unwrap();
            console.log(res);
            if (res?.code == 200) {
                setIsSpecialistModalVisible(false);
                message.success(res?.message);
            }

        } catch (error) {
            message.error('Failed to assign specialist');
        }
    };

    const [assignDoctor] = useAssignDoctorMutation()

    const handleDoctorOk = async () => {
        // Ensure a doctor is selected
        if (!selectedDoctorId) {
            message.error('Please select a doctor');
            return;
        }

        const data = {
            patientId: id,
            doctorId: selectedDoctorId,
        };

        try {
            const res = await assignDoctor(data).unwrap();
            console.log(res);
            if (res?.code == 200) {
                setIsDoctorModalVisible(false);
                message.success(res?.message);
            }
        } catch (error) {
            message.error('Failed to assign doctor');
        }
    };

    const handleCancel = () => {
        setIsSpecialistModalVisible(false);
        setIsDoctorModalVisible(false);
    };

    return (
        <div className='flex flex-row xl:flex-nowrap flex-wrap gap-5 items-start'>
            {/* Profile Section */}
            <div className='min-w-[250px] md:min-w-[250px] border order-1 xl:order-1 border-[#eee] rounded-xl p-3 relative'>
                <span className='px-4 py-2 bg-[#d30808] absolute capitalize top-5 rounded-lg text-primaryBg font-semibold right-5 text-white'>{user?.subscriptionType}</span>
                <img className='w-full rounded-xl' src={user?.profileImage?.imageUrl.includes('amazonaws') ? user?.profileImage?.imageUrl : url + user?.profileImage?.imageUrl} alt="" />
                <div className='p-2 text-center mt-2'>
                    <h2 className='font-semibold capitalize'>{user?.name}</h2>
                    <p>{user?.email}</p>
                </div>
            </div>

            {/* Tabs for Specialists and Doctors */}
            <Tabs defaultActiveKey="1" className='w-full order-3 xl:order-2'>
                <TabPane tab="Your Specialists" key="1">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {userSpecialists?.map((specialist) => (
                            <Card
                                style={{ width: 250 }}
                                cover={<img alt="specialist" src={url + specialist?.specialistId?.profileImage?.imageUrl} />}
                            >
                                <Card.Meta className='capitalize' title={specialist?.name} />
                                <p>{specialist?.specialistId?.profileId?.description}</p>
                                <div className='flex items-center flex-wrap gap-2'>
                                    {specialist?.specialistId?.profileId?.protocolNames?.map((protocol) => (
                                        <p className='px-4 py-1 border rounded-lg border-[#eee]'>{protocol}</p>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabPane>
                <TabPane tab="Doctor" key="2">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {userDoctors?.map((doctor) => (
                            <Card
                                style={{ width: 250 }}
                                cover={<img alt="doctor" src={url + doctor?.doctorId?.profileImage?.imageUrl} />}
                            >
                                <Card.Meta className='capitalize' title={doctor?.doctorId?.name} />
                                <p>{doctor?.doctorId?.profileId?.description}</p>
                                {/* <div className='flex items-center flex-wrap'>
                                    {doctor?.doctorId?.profileId?.protocolNames?.map((protocol) => (
                                        <p className='px-4 py-2 rounded-full border border-[#eee]'>{protocol}</p>
                                    ))}
                                </div> */}
                            </Card>
                        ))}
                    </div>
                </TabPane>
            </Tabs>

            {/* Assign New Specialist Button */}
            <Button
                type="primary"
                icon={<UserAddOutlined className='text-xl' />}
                onClick={handleAssignSpecialist}
                className='h-14 px-4 bg-gradient-to-br from-[#be70f8] to-[#f76776] text-primaryBg order-2 xl:order-3 rounded-lg flex items-center gap-2 hover:!bg-gradient-to-br border-none'
            >
                Assign New Specialist
            </Button>

            {/* Assign New Doctor Button */}
            <Button
                type="primary"
                icon={<UserAddOutlined className='text-xl' />}
                onClick={handleAssignDoctor}
                className='h-14 px-4 bg-gradient-to-br from-[#be70f8] to-[#f76776] text-primaryBg order-2 xl:order-3 rounded-lg flex items-center gap-2 hover:!bg-gradient-to-br border-none'
            >
                Assign New Doctor
            </Button>

            {/* Modal for Assigning Specialist */}
            <Modal
                title="Assign New Specialist"
                visible={isSpecialistModalVisible}
                onOk={handleSpecialistOk}
                onCancel={handleCancel}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Select
                        placeholder="Select a specialist"
                        onChange={(value) => setSelectedSpecialistId(value)}
                        value={selectedSpecialistId}
                        className='w-full h-10 my-5'
                    >
                        {userSpecialists?.map((specialist) => (
                            <Select.Option key={specialist._id} value={specialist._id}>
                                {specialist.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            </Modal>

            {/* Modal for Assigning Doctor */}
            <Modal
                title="Assign New Doctor"
                visible={isDoctorModalVisible}
                onOk={handleDoctorOk}
                onCancel={handleCancel}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Select
                        placeholder="Select a doctor"
                        onChange={(value) => setSelectedDoctorId(value)}
                        value={selectedDoctorId}
                        className='w-full h-10 my-5'
                    >
                        {userDoctors?.map((doctor) => (
                            <Select.Option key={doctor._id} value={doctor._id}>
                                {doctor.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            </Modal>
        </div>
    );
};

export default ViewProfileSpecialist;