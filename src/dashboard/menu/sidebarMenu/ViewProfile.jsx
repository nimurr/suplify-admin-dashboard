import React from "react";
import { Button, Input, Card, Typography } from "antd";
import { CheckCircleOutlined, EyeOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useGetUserProfileQuery } from "../../../redux/features/users/users";
import url from "../../../redux/api/baseUrl";

const { Title, Text } = Typography;

export default function ViewProfile() {
  // Example user data, replace with real data or props
  const { id } = useParams();
  const { data, isLoading } = useGetUserProfileQuery(id);
  const fullUserData = data?.data?.attributes?.results[0] || {};
  console.log(fullUserData);




  const handleVerify = () => {
    // verification logic here
    alert("User verified!");
  };

  const handleDecline = () => {
    // decline logic here
    alert("User declined!");
  };

  const handleViewFile = () => {
    window.open(fullUserData.fullUserData?.attachments[0]?.attachment, "_blank");

  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fullUserData.fullUserData?.attachments[0]?.attachment;
    link.download = fullUserData.fullUserData?.attachments[0]?.attachment.split("/").pop();
    link.click();
  };


  const navigate = useNavigate()
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg border border-[#eee]">
      <div onClick={() => navigate('/dashboard/user')} className="flex item-center cursor-pointer gap-2 mb-3" >
        <FaArrowLeft className="text-[28px] "></FaArrowLeft>
        <Title level={4} className="mb-6">User Profile</Title>
      </div>

      <Card className="mb-6 flex bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg items-center space-x-4">
        <div className="relative">
          {isLoading ? (
            <div className="w-24 h-24 rounded-full bg-[#eee] animate-pulse"></div>
          ) :
            <img
              src={url + fullUserData.profileImage?.imageUrl}
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          }
          {
            fullUserData?.profileId?.approvalStatus === 'approved' && (
              <CheckCircleOutlined
                className="absolute top-1 left-1 text-white text-xl text-[white] bg-[green] rounded-full"
              />
            )
          }

        </div>
        <Text strong className="text-xl text-[white]">{fullUserData.name}</Text>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <input type="text" className="p-3 border border-[#eee] rounded-lg ring-0 focus:outline-none text-[#666]" value={fullUserData.name} addonBefore="First Name" readOnly />
        <input type="text" className="p-3 border border-[#eee] rounded-lg ring-0 focus:outline-none text-[#666]" value={fullUserData.email} addonBefore="Email" readOnly />
      </div>

      <div className="flex items-center justify-between border border-[#eee] rounded-md p-4">
        {
          fullUserData.profileId?.attachments && fullUserData.profileId?.attachments.length > 0 ? (
            <div>
              <Text className="text-[#666] mb-5" strong>Upload document *</Text>
              <div className="text-[#666]">{fullUserData.fullUserData?.attachments[0]?.attachment} ({(fullUserData.profileId.attachments[0].size / 1024).toFixed(2)}kb)</div>
            </div>
          ) : (
            <div>
              <Text className="text-[#666] mb-5" strong>Upload document *</Text>
              <div className="text-[#666]">{
                fullUserData?.profileId?.approvalStatus === 'approved' ? 'Document Approved' : 'No document uploaded'
              }</div>
            </div>
          )
        }
        {
          fullUserData?.profileId?.approvalStatus !== 'approved' && (
            <div className="flex space-x-4">
              <button className="py-3 px-8 rounded-lg bg-[red] text-[white]" danger onClick={handleDecline}>Decline</button>
              <button className="py-3 px-8 rounded-lg bg-[blue] text-[white]" type="primary" onClick={handleVerify}>Click to verify</button>
            </div>
          )
        }
      </div>
      <div className="flex space-x-4 mt-4 justify-end">
        <Button className="h-10 px-10" icon={<EyeOutlined />} onClick={handleViewFile}>View File</Button>
        <Button className="h-10 px-10" icon={<DownloadOutlined />} onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
}
