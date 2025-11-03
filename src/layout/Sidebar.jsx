

import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../public/image/logod.png'
// import logo from '../../public/image/logo.png'
import { FaDollarSign, FaPersonRunning, FaSackDollar, FaUser, FaUsers, FaUsersLine } from "react-icons/fa6";
import { MdCategory, MdOutlineMedicalServices, MdOutlineStorefront, MdSubscriptions } from "react-icons/md";
import { BiMenu, BiSolidDashboard } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { PiGitPullRequestDuotone } from "react-icons/pi";
import { RiSecurePaymentFill, RiVideoDownloadLine } from "react-icons/ri";
import { CiCreditCard1, CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import { SiMagento } from "react-icons/si";
import { BsExclude } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoBookmarkOutline } from "react-icons/io5";
import { GiChessQueen } from "react-icons/gi";

const Sidebar = () => {

  const navigate = useNavigate();

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
          timer: 2000
        });
        navigate('/');
      }
    });
  };

  return (
    <div className="lg:w-[250px] xl:w-[300px] border-r border-[#e2e2e2] md:w-[200px] sm:w-[120px] w-[80px] flex flex-col justify-between bg-primaryBg h-full min-h-screen">
      <div>
        <div className="p-[10px] grid justify-items-stretch  sm:p-[16px]">
          <img className="h-14 rounded-lg justify-self-center" src={logo} alt="Logo" />

          {/* <hr className="w-full mt-4 text-[#54D496] hidden md:block" /> */}
        </div>
        <div className="sm:ml-5 mt-8">
          <ul>
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[15px] font-medium p-[10px] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg m-[6px] rounded-lg"
                  : "flex   cursor-pointer justify-start items-center text-[15px] font-medium p-[10px] bg-[#f5f5f5] m-[6px] rounded-lg"
              }
            >
              <BiSolidDashboard className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 md:block">Dashboard</span>
            </NavLink>

            <NavLink
              to="user"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[15px] font-medium p-[10px] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg m-[6px] rounded-lg"
                  : "flex   cursor-pointer justify-start items-center text-[15px] font-medium p-[10px] bg-[#f5f5f5] m-[6px] rounded-lg"
              }
            >
              <FaUsers className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 md:block">Users Management</span>
            </NavLink>

            <NavLink
              to="order"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[15px] font-medium p-[10px] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg m-[6px] rounded-lg"
                  : "flex   cursor-pointer justify-start items-center text-[15px] font-medium p-[10px] bg-[#f5f5f5] m-[6px] rounded-lg"
              }
            >
              <LuShoppingCart className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 md:block">Order</span>
            </NavLink>

            <NavLink
              to="withdraw-request"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[15px] font-medium p-[10px] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg m-[6px] rounded-lg"
                  : "flex   cursor-pointer justify-start items-center text-[15px] font-medium p-[10px] bg-[#f5f5f5] m-[6px] rounded-lg"
              }
            >
              <CiCreditCard1 className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 md:block">Withdraw request</span>
            </NavLink>
            <NavLink
              to="booked-lab-test"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[15px] font-medium p-[10px] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg m-[6px] rounded-lg"
                  : "flex   cursor-pointer justify-start items-center text-[15px] font-medium p-[10px] bg-[#f5f5f5] m-[6px] rounded-lg"
              }
            >
              <IoBookmarkOutline className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 md:block">Booked Lab Test</span>
            </NavLink>

            <NavLink
              to="store"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[15px] font-medium p-[10px] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg m-[6px] rounded-lg"
                  : "flex   cursor-pointer justify-start items-center text-[15px] font-medium p-[10px] bg-[#f5f5f5] m-[6px] rounded-lg"
              }
            >
              <MdOutlineStorefront className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 md:block">Store</span>
            </NavLink>

            <NavLink
              to="onboarding-video"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[15px] font-medium p-[10px] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg m-[6px] rounded-lg"
                  : "flex   cursor-pointer justify-start items-center text-[15px] font-medium p-[10px] bg-[#f5f5f5] m-[6px] rounded-lg"
              }
            >
              <RiVideoDownloadLine className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 md:block">Onboarding Video</span>
            </NavLink>
            <NavLink
              to="subscription"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[15px] font-medium p-[10px] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg m-[6px] rounded-lg"
                  : "flex   cursor-pointer justify-start items-center text-[15px] font-medium p-[10px] bg-[#f5f5f5] m-[6px] rounded-lg"
              }
            >
              <GiChessQueen className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 md:block">Subscription</span>
            </NavLink>

            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[15px] font-medium p-[10px] bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg m-[6px] rounded-lg"
                  : "flex   cursor-pointer justify-start items-center text-[15px] font-medium p-[10px] bg-[#f5f5f5] m-[6px] rounded-lg"
              }
            >
              <CiSettings className="h-8 w-8 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 md:block">Settings</span>
            </NavLink>
          </ul>
        </div>
      </div>
      {/* <div className="mb-[60px] mt-2">
        <div
          onClick={handleLogOut}
          className="flex items-center ml-[18px] cursor-pointer gap-2 text-[#942020] font-medium"
        >
          <HiLogout className="h-8 w-8 lg:h-5 lg:w-5" />
          <span className="hidden md:block text-[20px]">Log Out</span>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;