import React, { useState } from "react";
import { Button, Input, Card, Typography, Modal } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { GrDocumentText } from "react-icons/gr";
import { MdVerified } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import url from "../../../redux/api/baseUrl";
import { useAppRovedAndRejectMutation, useGetUserProfileQuery } from "../../../redux/features/users/users";

const { Title, Text } = Typography;

export default function ViewProfile() {
  const { id } = useParams();
  const { data, isLoading } = useGetUserProfileQuery(id);
  const fullUserData = data?.data?.attributes?.results[0] || {};

  const [VerifyUser] = useAppRovedAndRejectMutation();
  const [AppRovedAndReject] = useAppRovedAndRejectMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await VerifyUser({ id, approvalStatus: "approved" }).unwrap();
      if (res?.code === 200) toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleDecline = async () => {
    if (!declineReason.trim()) {
      toast.error("Please enter a reason for declining");
      return;
    }
    try {
      const res = await AppRovedAndReject({
        id,
        approvalStatus: "rejected",
        emailBody: declineReason,
      }).unwrap();
      if (res?.code === 200) {
        toast.success(res?.message);
        setIsModalVisible(false);
        setDeclineReason("");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg border border-[#eee]">
      <Toaster />

      <div
        onClick={() => navigate("/dashboard/user")}
        className="flex item-center cursor-pointer gap-2 mb-3"
      >
        <FaArrowLeft className="text-[28px]" />
        <Title level={4} className="mb-6">
          User Profile
        </Title>
      </div>

      <Card className="mb-6 flex bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg items-center space-x-4">
        <div className="relative">
          {isLoading ? (
            <div className="w-24 h-24 rounded-full bg-[#eee] animate-pulse"></div>
          ) : (
            <img
              src={url + fullUserData.profileImage?.imageUrl}
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex items-center gap-2 mt-5">
          <Text strong className="text-xl text-[white] capitalize">
            {fullUserData.name}
          </Text>
          {fullUserData?.profileId?.approvalStatus === "approved" && (
            <MdVerified className="text-white text-2xl text-[#196cca] rounded-full" />
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          className="p-3 border border-[#eee] rounded-lg ring-0 focus:outline-none text-[#666]"
          value={fullUserData.name}
          readOnly
        />
        <input
          type="text"
          className="p-3 border border-[#eee] rounded-lg ring-0 focus:outline-none text-[#666]"
          value={fullUserData.email}
          readOnly
        />
      </div>

      <h2 className="mb-5 text-[#727272] capitalize">
        Document Submitted By This {fullUserData.role}
      </h2>
      <div className="flex items-center gap-3 flex-wrap capitalize">
        {fullUserData.profileId?.attachments?.map((item, index) => (
          <Link
            key={index}
            to={
              item?.attachment.includes("amazonaws")
                ? item?.attachment
                : url + item?.attachment
            }
            target="_blank"
            className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg py-3 px-8 rounded-lg flex items-center justify-center gap-2  capitalize"
          >
            {item?.attachmentType === "image" ? <CiImageOn /> : <GrDocumentText />}
            {item?.attachmentType}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-end rounded-md p-4">
        <div className="flex space-x-4">
          <button
            className="py-3 px-8 rounded-lg bg-[#ad0000] text-[white]"
            onClick={() => setIsModalVisible(true)}
          >
            Decline
          </button>
          <button
            className="py-3 px-8 rounded-lg bg-[#003cac] text-[white]"
            onClick={handleVerify}
          >
            Click to verify
          </button>
        </div>
      </div>

      {/* Decline Modal */}
      <Modal
        title="Decline User"
        open={isModalVisible}
        onOk={handleDecline}
        onCancel={() => setIsModalVisible(false)}
        okText="Submit"
        cancelText="Cancel"
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter reason for declining..."
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
        />
      </Modal>
    </div>
  );
}
