import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetMyQsAnsQuery } from '../../../redux/features/questions/questions';
import { Spin, Empty, Tag } from 'antd';
import { CheckCircleOutlined, FileTextOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { IoArrowBack } from 'react-icons/io5';

const ViewAllQuestionsAnswer = () => {
    const { id } = useParams();

    const { data, isLoading } = useGetMyQsAnsQuery({ id });
    const fullQsAns = data?.data?.attributes?.results;

    const getAnswerTypeIcon = (type) => {
        switch (type) {
            case 'text':
                return <FileTextOutlined className="text-green-500" />;
            case 'single':
                return <CheckCircleOutlined className="text-blue-500" />;
            case 'multi':
                return <CheckSquareOutlined className="text-purple-500" />;
            default:
                return null;
        }
    };

    const getAnswerTypeColor = (type) => {
        switch (type) {
            case 'text':
                return 'green';
            case 'single':
                return 'blue';
            case 'multi':
                return 'purple';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
            <div className="">
                {/* HEADER */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <Link to={`/dashboard/user/specialist/${id}`} className="text-[#8400ff8e]  hover:underline border py-1 px-5 rounded-lg  flex items-center gap-2 justify-center w-auto" ><IoArrowBack /> Back To user Info </Link>

                        {fullQsAns && fullQsAns.length > 0 && (
                            <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm border border-[#eee]">
                                <span className="text-sm text-gray-600">
                                    Total Questions: <span className="font-semibold text-purple-600">{fullQsAns.length}</span>
                                </span>
                            </div>
                        )}

                    </div>

                    <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Question Answers
                    </h1>
                    <p className="text-gray-500 text-center">View all submitted answers for this assessment</p>

                </div>

                {/* QUESTIONS AND ANSWERS LIST */}
                {fullQsAns && fullQsAns.length > 0 ? (
                    <div className="space-y-6">
                        {fullQsAns.map((item, index) => (
                            <div
                                key={item._AssessmentAnswerId}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#eee]"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 pb-0 p-5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-semibold">
                                                    Question {index + 1}
                                                </span>
                                                <Tag color={getAnswerTypeColor(item.answerType)} className="flex items-center gap-1">
                                                    {getAnswerTypeIcon(item.answerType)}
                                                    {item.answerType.toUpperCase()}
                                                </Tag>

                                            </div>
                                        </div>
                                        {/* <div className="text-white/80 text-xs">
                                            {formatDate(item.createdAt)}
                                        </div> */}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    {/* Question Text */}
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="!border-[#83d88e] border text-[#83d88e] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-sm font-bold">Q</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                            {item.questionId?.questionText}
                                        </h3>
                                    </div>

                                    {/* Answer Section */}
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <div className="!border-[#83c0d8] border text-[#83c0d8] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                                                <span className="text-sm font-bold">A</span>
                                            </div>
                                            <div className="flex-1">
                                                {item.answerType === 'text' ? (
                                                    <p className="text-gray-800 text-base leading-relaxed">
                                                        {item.answerValue}
                                                    </p>
                                                ) : item.answerType === 'multi' && Array.isArray(item.answerValue) ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.answerValue.map((answer, idx) => (
                                                            <Tag
                                                                key={idx}
                                                                className="px-4 py-2 rounded-lg border-[#0238ac] bg-white text-purple-700 font-medium"
                                                            >
                                                                ✓ {answer}
                                                            </Tag>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <Tag className="px-4 py-2 rounded-lg border-[#0238ac] bg-white text-blue-700 font-medium">
                                                        ⚪ {item.answerValue}
                                                    </Tag>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="bg-gray-50 px-6 py-3 border-t border-[#eee]">
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>User ID: {item.userId}</span>
                                        <span>ID: {item._AssessmentAnswerId}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md p-12">
                        <Empty
                            description={
                                <span className="text-gray-500">
                                    No answers found for this assessment.
                                </span>
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAllQuestionsAnswer;