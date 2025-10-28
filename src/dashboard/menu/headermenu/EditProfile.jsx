import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import "react-phone-number-input/style.css";
import defaultUserImage from "../../../../public/image/randomuser.jpg";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../redux/features/auth/profile/editProfile";
import url from "../../../redux/api/baseUrl";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const [user, setUser] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, [])

  console.log(user?._id);

  const { data } = useGetProfileQuery({ id: user?._id });
  const profile = data?.data?.attributes;
  console.log(profile);

  // Handle image file upload
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList[0]?.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(newFileList[0].originFileObj);
      reader.onload = () => setImageUrl(reader.result);
    }
  };
  const [name, setName] = useState('')

  const [updateProfile] = useUpdateProfileMutation();


  // Handle form submission and logging of values
  const handleUpdateProfile = async (values) => {

    // Form data processing, can include phone number and uploaded image if needed
    const formData = new FormData();
    formData.append("name", name);
    if (fileList[0]?.originFileObj) {
      formData.append("profileImage", fileList[0].originFileObj); // Append the uploaded image
    }

    // Further processing can go here, like sending formData to an API.
    try {
      const res = await updateProfile({ data: formData, id: user?._id }).unwrap();
      if (res?.code === 200) {
        toast.success(res?.message);
      }
      setTimeout(() => navigate('/dashboard/profile'), 1000);
    } catch (error) {
      console.log(error?.data);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <Toaster />
      <div
        onClick={() => navigate("/dashboard/profile")}
        className="flex items-center cursor-pointer my-5"
      >
        <MdOutlineKeyboardArrowLeft size={30} />
        <h1 className="text-xl font-medium ml-2">Edit Profile</h1>
      </div>

      <div className="p-9 rounded-xl bg-white border border-[#eee]">
        <Form
          layout="vertical"
          autoComplete="off"
          onFinish={handleUpdateProfile}
        >
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex flex-col items-center w-full lg:w-1/3 border-dotted border border-[#979797]">
              <div className="relative w-56 h-56 rounded-full flex justify-center items-center mt-5 bg-gray-50 border border-[#979797]">
                <Upload
                  name="avatar"
                  showUploadList={false}
                  onChange={handleUploadChange}
                >
                  <img
                    className="w-44 h-44 rounded-full"
                    src={imageUrl || url + profile?.profileImage?.imageUrl}
                    alt="Profile"
                  />
                  <Button
                    className="border-none text-md text-blue-500 absolute bottom-6 flex items-center"
                    icon={<LuImagePlus size={20} className="mr-2" />}
                  >
                    Change Picture
                  </Button>
                </Upload>
              </div>

              <div className="text-center mt-6">
                <p className="text-lg">{profile?.role}</p>
                <h1 className="text-2xl font-medium">{profile?.name}</h1>
              </div>
            </div>

            <div className="flex-1 w-full lg:w-2/3">
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-xl">Name</h2>
                <input defaultValue={profile?.name} onChange={(e) => setName(e.target.value)} name="name" className="p-4 rounded-lg border border-[#eee]" />

                <h2 className="font-semibold text-xl">Email</h2>
                <span className="p-4 rounded-lg border border-[#eee] text-[#838383]">{profile?.email}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              htmlType="submit"
              className="mt-12 h-14 flex justify-center items-center bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-[white] rounded-lg text-lg font-medium"
            >
              Update Profile
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;