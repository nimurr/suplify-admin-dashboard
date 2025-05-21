import React from "react";
import { Button, Input, Card, Typography } from "antd";
import { CheckCircleOutlined, EyeOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function ViewProfile() {
  // Example user data, replace with real data or props
  const user = {
    fullName: "Mahmudur Rahman Talukder",
    firstName: "Mahmudur Rahman Talukder",
    email: "mahmudur.talukder@gmail.com",
    profilePic: "/public/image/users.jpg", // Replace with user image url
    document: {
      name: "doc 1.pdf",
      size: "30.4kb",
      url: "/documents/doc1.pdf", // Replace with file URL
    },
  };

  const handleVerify = () => {
    // verification logic here
    alert("User verified!");
  };

  const handleDecline = () => {
    // decline logic here
    alert("User declined!");
  };

  const handleViewFile = () => {
    window.open(user.document.url, "_blank");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = user.document.url;
    link.download = user.document.name;
    link.click();
  };
const navigate = useNavigate()
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex item-center gap-2">

      <ArrowLeftOutlined onClick={() => navigate('/dashboard/user')} className="text-[28px] cursor-pointer"></ArrowLeftOutlined>
      <Title level={4} className="mb-6">User Profile</Title>
      </div>

      <Card className="mb-6 flex items-center space-x-4">
        <div className="relative">
          <img
            src={user.profilePic}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <CheckCircleOutlined
            style={{ color: "green", fontSize: 24, position: "absolute", bottom: 0, right: 0, backgroundColor: "white", borderRadius: "50%" }}
          />
        </div>
        <Text strong className="text-xl">{user.fullName}</Text>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input value={user.firstName} addonBefore="First Name" readOnly />
        <Input value={user.email} addonBefore="Email" readOnly />
      </div>

      <div className="flex items-center justify-between border rounded-md p-4">
        <div>
          <Text strong>Upload document *</Text>
          <div>{user.document.name} ({user.document.size})</div>
        </div>

        <div className="flex space-x-4">
          <Button danger onClick={handleDecline}>Decline</Button>
          <Button type="primary" onClick={handleVerify}>Click to verify</Button>
        </div>
      </div>

      <div className="flex space-x-4 mt-4 justify-end">
        <Button icon={<EyeOutlined />} onClick={handleViewFile}>View File</Button>
        <Button icon={<DownloadOutlined />} onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
}
