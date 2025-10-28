import { Image, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import user from '../../../../public/image/randomuser.jpg';
import { useGetProfileQuery } from "../../../redux/features/auth/profile/editProfile";
import url from "../../../redux/api/baseUrl";


const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const { data } = useGetProfileQuery({ id: user?._id });
  const profile = data?.data?.attributes;
  console.log(profile);

  // console.log(profile);


  return (
    <div className="p-4">
      <div className="flex justify-between items-center my-5">
        <h1 className="text-2xl md:text-3xl font-medium">Profile Information</h1>
        <div
          onClick={() => navigate(`/dashboard/editprofile`)}
          className="flex gap-2 items-center py-3 px-6 rounded-lg cursor-pointer bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f]  text-[white]"
        >
          <FaEdit size={17} />
          <p>Edit Profile</p>
        </div>
      </div>

      <div className="lg:flex md:flex gap-4 border border-[#eee] bg-white p-4 rounded-xl">
        <div className="lg:w-1/3 flex flex-col border border-dotted border-[#d3d3d3] p-4 justify-center items-center gap-8">
          <div className="rounded-full border-2 border-[#979797] overflow-hidden h-[180px] w-[180px] mx-auto">
            {/* <Image src={url + profile?.data?.attributes?.image} /> */}
            <img className="w-full" src={ profile?.profileImage?.imageUrl} />
          </div>

          <div className="flex flex-col justify-center items-center text-center">
            {/* <p className="text-lg md:text-xl">{profile?.data?.attributes?.role}</p> */}
            <p className="text-lg md:text-xl">{profile?.role}</p>
            <h1 className="text-2xl md:text-3xl font-medium capitalize">{profile?.name}</h1>
          </div>
        </div>

        <div className="lg:w-2/3 mt-8 lg:mt-0 px-5">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="name" className="text-lg md:text-xl font-medium">
                  Name
                </label>
                <Input
                  placeholder="First name"
                  // value={profile?.data?.attributes?.name}
                  value={profile?.name}
                  className="p-4 text-lg md:text-xl bg-[#8400ff13] text-black rounded w-full mt-3 outline-none focus:bg-[#8400ff13] hover:bg-[#8400ff36]"
                  type="text"
                  readOnly
                />
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="email" className="text-lg md:text-xl font-medium">
                Email
              </label>
              <Input
                placeholder="Email"
                value={profile?.email}
                className="p-4 text-lg md:text-xl bg-[#8400ff13] rounded w-full mt-3 outline-none focus:bg-[#8400ff13] hover:bg-[#8400ff36]"
                type="text"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
