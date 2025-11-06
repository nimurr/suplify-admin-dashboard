import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useCreateOnboardingVideoMutation, useGetOnboardingVideoQuery } from '../../redux/features/OnboardingVideo/onboardingVideo';
import toast, { Toaster } from 'react-hot-toast';

const OnboardingVideo = () => {
    const { data, isLoading, error } = useGetOnboardingVideoQuery();
    const video = data?.data?.attributes[0];
    // console.log(video);

    const [videoURL, setVideoURL] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputURL, setInputURL] = useState('');
    const [inputImage, setInputImage] = useState(null);


    // Ensuring that video URL is set when data is fetched
    useEffect(() => {
        if (video?.introductionVideo?.attachment) {
            setVideoURL(video.introductionVideo.attachment);
        }
    }, [video]);

    const handleModalOpen = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleVideoURLChange = (e) => {
        setInputURL(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setInputImage(file);
        }
    };
    const [createOnboardingVideo, { isLoading: isUploading, error: uploadError }] = useCreateOnboardingVideoMutation();


    const handleSubmit = async () => {


        try {
            const formData = new FormData();
            if (inputURL) {
                formData.append('attachment', inputURL);
            }
            if (inputImage) {
                formData.append('introductionVideo', inputImage);
            }

            if (!inputURL && !inputImage) {
                toast.error('Please provide a video URL or upload a video.');
                return;
            }

            const res = await createOnboardingVideo(formData).unwrap();

            console.log(res);

            if (res.code === 200) {
                toast.success('Video uploaded successfully!');
                handleModalClose();
            }


        } catch (error) {
            console.log('Error uploading video:', error);
            toast.error('Failed to upload video. Please try again.');
        }

    };

    // Conditional loading
    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div className=" mx-auto ">
            <Toaster />
            <div className="flex justify-end my-5">
                <button
                    type="button"
                    onClick={handleModalOpen}
                    className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex items-center justify-center gap-2 hover:bg-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg"
                >
                    <MdOutlineCloudUpload /> Upload Video / Edit
                </button>
            </div>

            <div className="video-container w-full ">
                {videoURL ? (
                    <div key={videoURL} className="relative mt-4">
                        <video autoPlay controls className="rounded-lg border-2 border-[#eee] w-full lg:w-4/5 mx-auto h-auto">
                            <source src={videoURL} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {thumbnail && (
                            <video src={thumbnail} className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted></video>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No video selected. Please upload a video.</p>
                )}
            </div>

            {/* Ant Design Modal */}
            <Modal
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null} // No default footer, we will provide custom buttons
                className="p-4 rounded-lg shadow-lg"
            >
                <div className="flex flex-col space-y-4 mt-5 ">
                    <h2 className='text-2xl font-semibold mb-5 text-center'>Upload Video / Edit </h2>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Video URL</label>
                        <Input
                            value={inputURL}
                            onChange={handleVideoURLChange}
                            placeholder="Enter video URL"
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    {/* // this is or with line  */}
                    <div className="flex items-center justify-between gap-3">
                        <span className="w-full block h-[1px] bg-[#eee]"></span>
                        <label className="text-sm font-medium text-gray-700 ">Or</label>
                        <span className="w-full block h-[1px] bg-[#eee]"></span>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Upload Video</label>
                        </div>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleImageChange}
                            className="p-2 border cursor-pointer border-[#eee] rounded-lg w-full"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 font-semibold mt-4">
                        <button onClick={handleModalClose} className="bg-[#da0101] text-primaryBg py-2 px-4 rounded-lg hover:bg-gray-600">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} type="button" className="bg-[#0171da] py-2 px-4 rounded-lg hover:bg-gray-600 hover:bg-blue-600 text-primaryBg">
                            Submit {isUploading ? 'Uploading ...' : ''}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default OnboardingVideo;
