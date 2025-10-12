import { createBrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import ForgotPassword from "../auth/forgotpassword";
import VerifyOtp from "../auth/VerifyOtp";
import UpdatePassword from "../auth/UpdatePassword";
import Main from "../layout/Main";
import DashboardHome from "../dashboard/home/DashboardHome";
import Notification from "../dashboard/menu/headermenu/Notification";
import Profile from "../dashboard/menu/headermenu/Profile";
import EditProfiel from "../dashboard/menu/headermenu/EditProfile"; 
 
import PrivacyPolicy from "../dashboard/menu/privacypolicy/PrivacyPolicy";
import EditPrivacy from "../dashboard/menu/privacypolicy/EditPrivacy";
import TermCondition from "../dashboard/menu/termsCondition/TermCondition";
import EditTermCondition from "../dashboard/menu/termsCondition/EditTermCondition";

import ErrorPage from "./ErrorPage";
import About from "../dashboard/menu/about/About";
import EditAbout from "../dashboard/menu/about/EditAbout";
 
import User from "../dashboard/menu/sidebarMenu/User";
import Earning from "../dashboard/menu/sidebarMenu/Earning";
 
import Settings from "../dashboard/menu/sidebarMenu/Settings";
import Store from "../dashboard/menu/sidebarMenu/Store";
import ViewProfile from "../dashboard/menu/sidebarMenu/ViewProfile";
import ViewStore from "../dashboard/menu/sidebarMenu/ViewStore";
import SupplementCreateForm from "../dashboard/menu/sidebarMenu/CreateSuppliment";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement: <ErrorPage />
    },
    {
        path: "forgotpassword",
        element: <ForgotPassword></ForgotPassword>
    },
    {
        path: "verifyotp",
        element: <VerifyOtp></VerifyOtp>
    },
    {
        path: "updatepassword",
        element: <UpdatePassword />
    },

    {
        path: "dashboard",
        element: <Main></Main>,
        children: [
            {
                path: "home",
                element: <DashboardHome />
            },
            {
                path: "notification",
                element: <Notification />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "editprofile",
                element: <EditProfiel />
            },
            {
                path: "store",
                element: <Store />
            },
            {
                path: "store/view-store",
                element: <ViewStore />
            },
            {
                path: "store/view-store/create-suppliment",
                element: <SupplementCreateForm />
            },
            {
                path:"user",
                element: <User />
            },
            {
                path:"user/view-user",
                element: <ViewProfile />
            },
            
            {
                path: 'settings',
                element:<Settings />
            },
            {
                path:'settings/privacypolicy',
                element:<PrivacyPolicy />
            },
            {
                path:'settings/editprivacypolicy',
                element: <EditPrivacy />
            },
            {
                path:"settings/termcondition",
                element:<TermCondition />
            },
            {
                path: "settings/edittermcondition",
                element: <EditTermCondition />
            },
            {
                path:'settings/about',
                element: <About />
            },
            {
                path:'settings/editabout',
                element:<EditAbout />
            },
        ]
    }
])