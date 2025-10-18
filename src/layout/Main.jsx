import { Outlet } from "react-router-dom";


import Sidebar from "./Sidebar";
import Header from "./Header";


const Main = () => {
  return (
    <div>
      <div className="flex p-4 min-h-screen">
        <div className="fixed z-30 w-[200px] left-3">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">

          <div className=" fixed xl:ml-[310px] lg:ml-[250px] md:ml-[200px] sm:ml-[120px] ml-[90px] w-[75%] mx-auto z-30  lg:w-[calc(98%-300px)]">
            <Header />
          </div>

          <div className="overflow-y-auto mt-12 ml-8 h-full flex-1 pt-[80px] xl:pl-[280px] lg:pl-[230px] md:pl-[200px] sm:pl-[100px] pl-[60px]">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Main;

