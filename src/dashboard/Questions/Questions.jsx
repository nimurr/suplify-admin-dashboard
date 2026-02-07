import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Switch,
    Button,
    Space,
    Card,
    Table,
    Tag
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useCreateQuestionMutation, useDeleteQuestionMutation, useGetQuestionsQuery } from '../../redux/features/questions/questions';
import toast from 'react-hot-toast';

const { Option } = Select;

const Questions = () => {

    const [createQuestions] = useCreateQuestionMutation();
    const { data: allQuestions, refetch, isLoading } = useGetQuestionsQuery();
    const [deleteQuestion] = useDeleteQuestionMutation();

    const fullQuestions = allQuestions?.data?.attributes?.results;
    console.log(fullQuestions)

    const [form] = Form.useForm();

    const answerType = Form.useWatch('answerType', form);

    const onFinish = async (values) => {
        const newQuestion = {
            questionText: values.questionText,
            answerType: values.answerType,
            isRequired: values.isRequired,
            answers:
                values.answerType === 'text'
                    ? []
                    : values.answers?.map((a, index) => ({
                        answerTitle: a.answerTitle
                    })) || []
        };


        try {
            const res = await createQuestions(newQuestion).unwrap();
            console.log(res)
            if (res?.code == 200) {
                toast.success(res?.message)
                form.resetFields();
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message);
        }


    };

    const handleDelete = async (data) => {
        console.log(data?._id);

        try {
            const res = await deleteQuestion(data?._id).unwrap();
            console.log(res);
            if (res?.code == 200) {
                toast.success(res?.message);
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };

    const columns = [
        {
            title: 'Question',
            dataIndex: 'questionText',
            key: 'questionText'
        },
        {
            title: 'Answer Type',
            dataIndex: 'answerType',
            key: 'answerType',
            render: (type) => {
                const colorMap = {
                    text: 'green',
                    single: 'blue',
                    multi: 'purple',
                };

                return (
                    <Tag className='py-2' color={colorMap[type] || 'default'}>
                        {type.toUpperCase()}
                    </Tag>
                );
            }
        },
        {
            title: 'Status',
            dataIndex: 'isRequired',
            key: 'isRequired',
            render: (val) =>
                val && <p className={`flex items-center justify-center py-2 px-3 text-[#fff] rounded ${val ? 'bg-[#07bb07]' : '!bg-[#df0000]'}`}> {val ? 'Active' : 'Inactive'}</p>
        },
        {
            title: 'Answers',
            key: 'answers',
            render: (_, record) =>
                record.answers.length ? (
                    <Space className='max-w-72 flex flex-wrap' size="middle">
                        {record.answers.map((a) => (
                            <Tag className='py-2 px-2' key={a._id}>{a.answerTitle}</Tag>
                        ))}
                    </Space>
                ) : (
                    <Tag color="default">Text Input</Tag>
                )
        }
        // action for delete
        , {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleDelete(record)} className='py-3 px-8 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg rounded-lg'>Delete</a>
                </Space>
            ),
        }
    ];

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Create Question Form */}
            <Card title="Create Question">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ isRequired: true }}
                >
                    <Form.Item
                        label="Question Text"
                        name="questionText"
                        rules={[{ required: true, message: 'Question is required' }]}
                    >
                        <Input className='py-3' placeholder="Enter question" />
                    </Form.Item>

                    <Form.Item
                        label="Answer Type"
                        name="answerType"
                        rules={[{ required: true }]}
                    >
                        <Select className='h-12' placeholder="Select answer type">
                            <Option value="text">Text</Option>
                            <Option value="single">Single Choice</Option>
                            <Option value="multi">Multiple Choice</Option>
                        </Select>
                    </Form.Item>
                    
                    {(answerType === 'single' || answerType === 'multi') && (
                        <Form.List className='my-4' name="answers">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name }) => (
                                        <Space
                                            key={key}
                                            align="baseline"
                                            style={{ display: 'flex', marginBottom: 8 }}
                                        >
                                            <Form.Item
                                                name={[name, 'answerTitle']}
                                                rules={[
                                                    { required: true, message: 'Answer required' }
                                                ]}
                                            >
                                                <Input className='py-3' placeholder="Answer option" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Button
                                        className='h-10'
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                    >
                                        Add Answer
                                    </Button>
                                </>
                            )}
                        </Form.List>
                    )}
                    <br />

                    <Form.Item
                        label="Required"
                        name="isRequired"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 24 }}>
                        <button className='py-3 px-8 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg rounded-lg' type="primary" htmlType="submit">
                            Create Question
                        </button>
                    </Form.Item>
                </Form>
            </Card>

            {/* Questions Table */}
            <Card title="All Questions">
                <Table
                    rowKey="_id"
                    isLoading={isLoading}
                    columns={columns}
                    dataSource={fullQuestions}
                    pagination={false}
                />
            </Card>
        </Space>
    );
};

export default Questions;