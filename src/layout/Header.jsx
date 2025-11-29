
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Avatar, Badge, Button, Modal, Form, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from "@ant-design/icons";

import { IoIosNotificationsOutline } from "react-icons/io";
// import { FaRegUser } from "react-icons/fa6";
import './header.css'
import Swal from "sweetalert2";
import { useState } from "react";
import { useGetProfileQuery } from "../redux/features/auth/profile/editProfile";
import { useChangePasswordMutation } from "../redux/features/auth/changePassword";
import toast, { Toaster } from "react-hot-toast";
import url from "../redux/api/baseUrl";






const Header = () => {

  const time = new Date().getHours();


  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [error, setError] = useState('')
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",

      text: "You won't be able to log out from here!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }

        Swal.fire({
          title: "Logged Out!",
          text: "User has been logged out successfully.",
          icon: "success",
          timer: 2000,

        });
        navigate('/');
      }
    });
  };

  const [passwordChange] = useChangePasswordMutation();

  const changePassword = async (values) => {
    const { confirmPassword, ...ChangePassword } = values;
    console.log("Form values: ", ChangePassword);

    const data = {
      ...ChangePassword,
      confirmPassword: confirmPassword
    }

    try {
      const res = await passwordChange(data).unwrap();
      console.log(res);
      if (res?.code == 200) {
        setIsModalOpen(false)
        toast.success(res?.message)
        setTimeout(() => {
          navigate('/dashboard/home')
        }, 1000);
      }

    } catch (error) {
      console.log(error.data);
      setError(error?.data?.message)
      toast.error(error?.data?.message)

    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const { data } = useGetProfileQuery({ id: user?._id });
  const profile = data?.data?.attributes;


  const handleMenuVisibility = (visible) => {
    setMenuVisible(visible);
  };

  const menu = (
    <Menu className={`transition ease-in-out duration-300 transform ${menuVisible ? 'custom-dropdown-menu-visible' : 'custom-dropdown-menu'}`}>
      <Menu.Item className=" hover:!bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] hover:text-[white]" key="1">
        <Link to="/dashboard/profile" className=" hover:!text-[white]">Profile</Link>
      </Menu.Item>
      <Menu.Item className=" hover:!bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] hover:!text-[white]" key="2">
        <p onClick={openModal} className="  hover:!text-[white]">Change Password</p>
      </Menu.Item>
      <Menu.Item className=" hover:!bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] hover:!text-[white]" key="3">
        <p onClick={handleLogOut} className=" hover:!text-[white]">Logout</p>
      </Menu.Item>
    </Menu>
  );



  return (
    <div className=" flex justify-between items-center border border-[#dddddd] mb-[24px] p-[16px] rounded-md !bg-primaryBg">
      <Toaster />
      <div className="text-white">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl px-0 font-medium flex items-center gap-1"> Good {time < 12 ? <div className="flex items-center gap-2">
            Morning
            <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=tMl3iJECqyRx&format=png" alt="" />
          </div> : time < 18 ? <div className="flex items-center gap-2">
            Afternoon
            <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=xctFOOIVorz0&format=png" alt="" />
          </div> :
            <div className="flex items-center gap-2">
              Evening
              <img className="w-10 h-10" src="https://img.icons8.com/?size=80&id=Ah2dOwUOsH7N&format=png" alt="" />
            </div>
          }  </h1>
        </div>


        {/* <h1>{profile?.data?.attributes?.name}</h1> */}
        <h1 className="text-whiteText capitalize text-xl font-semibold text-[#535353]">{profile?.name}</h1>
      </div>

      <div className="flex  gap-5">
        <Link to="/dashboard/notification" className="bg-gradient-to-br cursor-pointer from-[#8400ff8e] to-[#ff09099f] text-primaryBg h-[52px] w-[52px] rounded-lg flex items-center justify-center">
          <IoIosNotificationsOutline className="text-3xl text-white" />
        </Link>
        <div className="border border-[#ccc] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg px-2 py-1 rounded-lg">
          <Dropdown className="px-2" overlay={menu} trigger={['click']} onVisibleChange={handleMenuVisibility}>
            <a className="flex items-center text-white cursor-pointer text-whiteText">
              <Avatar src={profile?.profileImage?.imageUrl?.includes('amazonaws') ? profile?.profileImage?.imageUrl : url + profile?.profileImage?.imageUrl} className="mr-2 h-[42px] w-[42px]" />
              {profile?.name} <DownOutlined className="ml-1" />
            </a>
          </Dropdown>
        </div>

        <Modal
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <div className="flex flex-col w-[90%] mx-auto ">
            <h2 className="text-[28px] text-left font-semibold mb-2">Change Password</h2>
            <p className="  mb-8 text-gray-600">Your password must be 8-10 character long.</p>
            <Form
              name="changePassword"
              layout="vertical"
              onFinish={changePassword}

            >
              <Form.Item
                name="currentPassword"
                label="Old Password"
                rules={[{ required: true, message: "Please enter your old password!" }]}
              >
                <Input.Password
                  style={{
                    height: "40px",
                    background: "#8400ff13",
                    outline: "none",

                    border: '1px solid #8400ff8e'
                  }}
                  placeholder="Old Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: "Please enter your new password!" }]}
              >
                <Input.Password
                  style={{
                    height: "40px",
                    background: "#8400ff13",
                    outline: "none",

                    border: '1px solid #8400ff8e'
                  }}
                  placeholder="New Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords that you entered do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  style={{
                    height: "40px",
                    background: "#8400ff13",
                    outline: "none",

                    border: '1px solid #8400ff8e'
                  }}
                  placeholder="Confirm Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              {/* <p className="text-red-500 font-medium">{error}</p> */}
              <Form.Item>
                <button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-3 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg  !text-black text-[16px] rounded-md"
                >
                  Change Password
                </button>
              </Form.Item>
            </Form>
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default Header;