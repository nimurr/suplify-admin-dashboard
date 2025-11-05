import React from "react";
import { Button, Input, Card, Typography } from "antd";
import { CheckCircleOutlined, EyeOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useAppRovedAndRejectMutation, useGetUserProfileQuery } from "../../../redux/features/users/users";
import url from "../../../redux/api/baseUrl";
import { CiImageOn } from "react-icons/ci";
import { GrDocumentText } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { MdVerified } from "react-icons/md";

const { Title, Text } = Typography;

export default function ViewProfile() {
  // Example user data, replace with real data or props
  const { id } = useParams();
  const { data, isLoading } = useGetUserProfileQuery(id);
  const fullUserData = data?.data?.attributes?.results[0] || {};


  const [VerifyUser] = useAppRovedAndRejectMutation();
  const [AppRovedAndReject] = useAppRovedAndRejectMutation();

  const handleVerify = async () => {

    try {

      const res = await VerifyUser({ id, approvalStatus: "approved" }).unwrap();
      console.log(res);
      if (res?.code == 200) {
        toast.success(res?.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }


  };

  const handleDecline = async () => {

    try {

      const res = await AppRovedAndReject({ id, approvalStatus: "rejected" }).unwrap();
      console.log(res);
      if (res?.code == 200) {
        toast.success(res?.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }

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
      <Toaster />
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


        </div>
        <div className="flex items-center gap-2 mt-5">
          <Text strong className="text-xl text-[white] capitalize ">{fullUserData.name}</Text>
          <span> {
            fullUserData?.profileId?.approvalStatus === 'approved' && (
              <MdVerified
                className="text-white text-2xl text-[#196cca]  rounded-full"
              />
            )
          }</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <input type="text" className="p-3 border border-[#eee] rounded-lg ring-0 focus:outline-none text-[#666]" value={fullUserData.name} addonBefore="First Name" readOnly />
        <input type="text" className="p-3 border border-[#eee] rounded-lg ring-0 focus:outline-none text-[#666]" value={fullUserData.email} addonBefore="Email" readOnly />
      </div>
      <h2 className="mb-5 text-[#727272] capitalize">Document Submited By This {fullUserData.role}</h2>
      <div className="flex items-center gap-3 flex-wrap capitalize">
        {
          fullUserData.profileId?.attachments?.map((item, index) => (
            <Link to={item?.attachment.includes("amazonaws") ? item?.attachment : url + item?.attachment} target="_blank" className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg py-3 px-8 rounded-lg flex items-center justify-center gap-2  capitalize ">{item?.attachmentType == "image" ? <CiImageOn /> : <GrDocumentText />}{item?.attachmentType}</Link>
          ))
        }
      </div>
      <div className="flex items-center justify-end rounded-md p-4">

        <div className="flex space-x-4">
          <button className="py-3 px-8 rounded-lg bg-[#ad0000] text-[white]" danger onClick={handleDecline}>Decline</button>
          <button className="py-3 px-8 rounded-lg bg-[#003cac] text-[white]" type="primary" onClick={handleVerify}>Click to verify</button>
        </div>

      </div>
      {/* <div className="flex space-x-4 mt-4 justify-end">
        <Button className="h-10 px-10" icon={<EyeOutlined />} onClick={handleViewFile}>View File</Button>
        <Button className="h-10 px-10" icon={<DownloadOutlined />} onClick={handleDownload}>Download</Button>
      </div> */}
    </div>
  );
}
