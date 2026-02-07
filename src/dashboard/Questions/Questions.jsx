// import React, { useState } from 'react';
// import {
//     Form,
//     Input,
//     Select,
//     Switch,
//     Button,
//     Space,
//     Card,
//     Table,
//     Tag,
//     Modal
// } from 'antd';
// import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
// import {
//     useCreateQuestionMutation,
//     useDeleteQuestionMutation,
//     useGetQuestionsQuery
// } from '../../redux/features/questions/questions';
// import toast from 'react-hot-toast';

// const { Option } = Select;

// const Questions = () => {
//     const [form] = Form.useForm();
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const [createQuestions] = useCreateQuestionMutation();
//     const { data: allQuestions, refetch, isLoading } = useGetQuestionsQuery();
//     const [deleteQuestion] = useDeleteQuestionMutation();

//     const fullQuestions = allQuestions?.data?.attributes?.results;
//     const answerType = Form.useWatch('answerType', form);

//     // CREATE QUESTION
//     const onFinish = async (values) => {
//         const newQuestion = {
//             questionText: values.questionText,
//             answerType: values.answerType,
//             isRequired: values.isRequired,
//             answers:
//                 values.answerType === 'text'
//                     ? []
//                     : values.answers?.map((a) => ({
//                         answerTitle: a.answerTitle
//                     })) || []
//         };

//         try {
//             const res = await createQuestions(newQuestion).unwrap();
//             if (res?.code === 200) {
//                 toast.success(res?.message);
//                 form.resetFields();
//                 setIsModalOpen(false);
//                 refetch();
//             }
//         } catch (error) {
//             toast.error(error?.data?.message);
//         }
//     };

//     // DELETE QUESTION
//     const handleDelete = async (data) => {
//         try {
//             const res = await deleteQuestion(data?._id).unwrap();
//             if (res?.code === 200) {
//                 toast.success(res?.message);
//                 refetch();
//             }
//         } catch (error) {
//             toast.error(error?.data?.message);
//         }
//     };

//     // TABLE COLUMNS
//     const columns = [
//         {
//             title: 'Question',
//             dataIndex: 'questionText',
//             key: 'questionText'
//         },
//         {
//             title: 'Answer Type',
//             dataIndex: 'answerType',
//             key: 'answerType',
//             render: (type) => {
//                 const colorMap = {
//                     text: 'green',
//                     single: 'blue',
//                     multi: 'purple'
//                 };
//                 return (
//                     <Tag className="py-1" color={colorMap[type]}>
//                         {type.toUpperCase()}
//                     </Tag>
//                 );
//             }
//         },
//         {
//             title: 'Status',
//             dataIndex: 'isRequired',
//             key: 'isRequired',
//             render: (val) => (
//                 <p
//                     className={`py-2 px-3 rounded text-[#fff] text-center ${val ? 'bg-[#07bb07]' : 'bg-[#df0000]'
//                         }`}
//                 >
//                     {val ? 'Active' : 'Inactive'}
//                 </p>
//             )
//         },
//         {
//             title: 'Answers',
//             key: 'answers',
//             render: (_, record) =>
//                 record.answers?.length ? (
//                     <Space className="flex flex-wrap max-w-72">
//                         {record.answers.map((a) => (
//                             <Tag key={a._id}>{a.answerTitle}</Tag>
//                         ))}
//                     </Space>
//                 ) : (
//                     <Tag>Text Input</Tag>
//                 )
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (_, record) => (
//                 <a
//                     onClick={() => handleDelete(record)}
//                     className="py-2 px-6 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-[#fff] rounded-lg"
//                 >
//                     Delete
//                 </a>
//             )
//         }
//     ];

//     return (
//         <Space direction="vertical" size="large" style={{ width: '100%' }}>
//             {/* HEADER */}
//             <div className="flex justify-between items-center">
//                 <h1 className="text-2xl font-medium">Questions</h1>
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="py-3 px-8 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-[#fff] rounded-lg"
//                 >
//                     Add Question
//                 </button>
//             </div>

//             {/* QUESTIONS TABLE */}
//             {/* <Card title="All Questions"> */}
//             <div className='w-full overflow-x-auto border border-[#f1f1f1] rounded-xl'>

//                 <Table
//                     rowKey="_id"
//                     loading={isLoading}
//                     columns={columns}
//                     dataSource={fullQuestions}
//                     pagination={false}
//                 />
//             </div>
//             {/* </Card> */}

//             {/* ADD QUESTION MODAL */}
//             <Modal
//                 title="Create Question"
//                 open={isModalOpen}
//                 onCancel={() => setIsModalOpen(false)}
//                 footer={null}
//                 width={700}
//                 destroyOnClose
//             >
//                 <Form
//                     form={form}
//                     layout="vertical"
//                     onFinish={onFinish}
//                     initialValues={{ isRequired: true }}
//                 >
//                     <Form.Item
//                         label="Question Text"
//                         name="questionText"
//                         rules={[{ required: true, message: 'Question is required' }]}
//                     >
//                         <Input className="py-3" placeholder="Enter question" />
//                     </Form.Item>

//                     <Form.Item
//                         label="Answer Type"
//                         name="answerType"
//                         rules={[{ required: true }]}
//                     >
//                         <Select className="h-12" placeholder="Select answer type">
//                             <Option value="text">Text</Option>
//                             <Option value="single">Single Choice</Option>
//                             <Option value="multi">Multiple Choice</Option>
//                         </Select>
//                     </Form.Item>

//                     {(answerType === 'single' || answerType === 'multi') && (
//                         <Form.List name="answers">
//                             {(fields, { add, remove }) => (
//                                 <>
//                                     {fields.map(({ key, name }) => (
//                                         <Space
//                                             key={key}
//                                             align="baseline"
//                                             style={{ display: 'flex', marginBottom: 8 }}
//                                         >
//                                             <Form.Item
//                                                 name={[name, 'answerTitle']}
//                                                 rules={[{ required: true, message: 'Answer required' }]}
//                                             >
//                                                 <Input className="py-3" placeholder="Answer option" />
//                                             </Form.Item>
//                                             <MinusCircleOutlined onClick={() => remove(name)} />
//                                         </Space>
//                                     ))}
//                                     <Button
//                                         type="dashed"
//                                         onClick={() => add()}
//                                         icon={<PlusOutlined />}
//                                     >
//                                         Add Answer
//                                     </Button>
//                                 </>
//                             )}
//                         </Form.List>
//                     )}

//                     <Form.Item
//                         label="Required"
//                         name="isRequired"
//                         valuePropName="checked"
//                     >
//                         <Switch />
//                     </Form.Item>

//                     <Form.Item className="flex justify-end gap-3">
//                         <Button className='h-12 px-5' onClick={() => setIsModalOpen(false)}>
//                             Cancel
//                         </Button>
//                         <Button
//                             type="primary"
//                             htmlType="submit"
//                             className="py-3 px-8 h-12 ml-2 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f]"
//                         >
//                             Create Question
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </Space>
//     );
// };

// export default Questions;



import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Switch,
    Button,
    Space,
    Card,
    Tag,
    Modal,
    Empty,
    Spin
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    useCreateQuestionMutation,
    useDeleteQuestionMutation,
    useGetQuestionsQuery
} from '../../redux/features/questions/questions';
import toast from 'react-hot-toast';

const { Option } = Select;

const Questions = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [createQuestions] = useCreateQuestionMutation();
    const { data: allQuestions, refetch, isLoading } = useGetQuestionsQuery();
    const [deleteQuestion] = useDeleteQuestionMutation();

    const fullQuestions = allQuestions?.data?.attributes?.results;
    const answerType = Form.useWatch('answerType', form);

    // CREATE QUESTION
    const onFinish = async (values) => {
        const newQuestion = {
            questionText: values.questionText,
            answerType: values.answerType,
            isRequired: values.isRequired,
            answers:
                values.answerType === 'text'
                    ? []
                    : values.answers?.map((a) => ({
                        answerTitle: a.answerTitle
                    })) || []
        };

        try {
            const res = await createQuestions(newQuestion).unwrap();
            if (res?.code === 200) {
                toast.success(res?.message);
                form.resetFields();
                setIsModalOpen(false);
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };

    // DELETE QUESTION
    const handleDelete = async (data) => {
        try {
            const res = await deleteQuestion(data?._id).unwrap();
            if (res?.code === 200) {
                toast.success(res?.message);
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };

    const getTypeColor = (type) => {
        const colorMap = {
            text: 'green',
            single: 'blue',
            multi: 'purple'
        };
        return colorMap[type];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 ">
            <div className="">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Questions
                        </h1>
                        <p className="text-gray-500 mt-2">Manage your survey questions</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="py-3 px-8 !bg-gradient-to-r !from-purple-600 !to-pink-600 !text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium border border-[#f1f1f1]"
                    >
                        <PlusOutlined className="mr-2" />
                        Add Question
                    </button>
                </div>

                {/* QUESTIONS GRID */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spin size="large" />
                    </div>
                ) : fullQuestions && fullQuestions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {fullQuestions.map((question, index) => (
                            <div
                                key={question._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#e9e9e9] hover:border-purple-200"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <Tag color={getTypeColor(question.answerType)} className="mb-2">
                                                {question.answerType.toUpperCase()}
                                            </Tag>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(question)}
                                            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-200"
                                        >
                                            <DeleteOutlined className="text-[#e20000] text-lg" />
                                        </button>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2 min-h-[3.5rem]">
                                        {question.questionText}
                                    </h3>

                                    {/* Answers Section */}
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-600 mb-2">
                                            Answer Options:
                                        </p>
                                        {question.answers?.length ? (
                                            <div className="flex flex-wrap gap-2">
                                                {question.answers.map((answer) => (
                                                    <Tag
                                                        key={answer._id}
                                                        className="px-3 py-1 rounded-full border-purple-200 bg-purple-50 text-purple-700"
                                                    >
                                                        {answer.answerTitle}
                                                    </Tag>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 rounded-lg p-3 border border-dashed border-gray-300">
                                                <p className="text-gray-500 text-sm">Text Input Field</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="bg-gray-50 px-5 py-3 border-t border-[#e9e9e9]">
                                    <p className="text-xs font-semibold text-gray-500">
                                        Question #{index + 1}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md p-12">
                        <Empty
                            description={
                                <span className="text-gray-500">
                                    No questions yet. Create your first question to get started!
                                </span>
                            }
                        />
                    </div>
                )}

                {/* ADD QUESTION MODAL */}
                <Modal
                    title={
                        <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Create New Question
                        </span>
                    }
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    width={700}
                    destroyOnClose
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{ isRequired: true }}
                        className="mt-6"
                    >
                        <Form.Item
                            label={<span className="font-medium text-gray-700">Question Text</span>}
                            name="questionText"
                            rules={[{ required: true, message: 'Question is required' }]}
                        >
                            <Input
                                className="py-3 rounded-lg"
                                placeholder="Enter your question here..."
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="font-medium text-gray-700">Answer Type</span>}
                            name="answerType"
                            rules={[{ required: true }]}
                        >
                            <Select className="h-12" placeholder="Select answer type">
                                <Option value="text">📝 Text Input</Option>
                                <Option value="single">⚪ Single Choice</Option>
                                <Option value="multi">☑️ Multiple Choice</Option>
                            </Select>
                        </Form.Item>

                        {(answerType === 'single' || answerType === 'multi') && (
                            <Form.List name="answers">
                                {(fields, { add, remove }) => (
                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <label className="font-medium text-gray-700 mb-3 block">
                                            Answer Options
                                        </label>
                                        {fields.map(({ key, name }) => (
                                            <Space
                                                key={key}
                                                align="baseline"
                                                style={{ display: 'flex', marginBottom: 12 }}
                                            >
                                                <Form.Item
                                                    name={[name, 'answerTitle']}
                                                    rules={[{ required: true, message: 'Answer required' }]}
                                                    style={{ marginBottom: 0, flex: 1 }}
                                                >
                                                    <Input
                                                        className="py-3 rounded-lg"
                                                        placeholder="Enter answer option"
                                                    />
                                                </Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                    className="text-red-500 text-lg hover:text-red-700 cursor-pointer"
                                                />
                                            </Space>
                                        ))}
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            icon={<PlusOutlined />}
                                            className="w-full h-10 mt-2 border-purple-300 text-purple-600 hover:border-purple-500 hover:text-purple-700"
                                        >
                                            Add Answer Option
                                        </Button>
                                    </div>
                                )}
                            </Form.List>
                        )}

                        <Form.Item
                            label={<span className="font-medium text-gray-700">Is this question required?</span>}
                            name="isRequired"
                            valuePropName="checked"
                        >
                            <Switch className="bg-gray-300" />
                        </Form.Item>

                        <Form.Item className="mb-0 mt-6">
                            <div className="flex justify-end gap-3">
                                <Button
                                    className="h-12 px-6 rounded-lg"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="h-12 px-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 border-none hover:opacity-90"
                                >
                                    Create Question
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Questions;