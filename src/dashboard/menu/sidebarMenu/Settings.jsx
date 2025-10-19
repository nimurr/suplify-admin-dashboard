import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
// import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from "@ant-design/icons";

const Settings = () => {
  const navigate = useNavigate();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const changePassword = (values) => {
  //   const { confirmPassword, ...ChangePassword } = values;
  //   console.log("Form values: ", ChangePassword);
  // };

  return (
    <div className=" ">
      <h1 className="font-semibold text-[25px]">Settings</h1>
      <div> 
        {/* Privacy policy */}
        <div onClick={() => navigate("/dashboard/settings/privacypolicy")} className="mt-5 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]">
          <p className="text-[16px] ml-8 font-medium">Privacy Policy</p>
          <Link to="/dashboard/settings/privacypolicy" className="mr-8 text-[#f5f5f5] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </Link>
        </div>
        <div onClick={() => navigate("/dashboard/settings/termcondition")} className="mt-5 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex justify-between cursor-pointer bg-[#F7F7F7] rounded items-center w-full h-[75px]">
          <p className="text-[16px] ml-8 font-medium">Terms and Condition</p>
          <Link to="/dashboard/settings/termcondition" className="mr-8 text-[#f5f5f5] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </Link>
        </div>
        <div onClick={() => navigate("/dashboard/settings/about")} className="mt-5 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]">
          <p className="text-[16px] ml-8 font-medium">About Us</p>
          <Link to="/dashboard/settings/about" className="mr-8 text-[#f5f5f5] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
