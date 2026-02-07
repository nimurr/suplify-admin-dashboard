import { createBrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import ForgotPassword from "../auth/ForgotPassword";
import VerifyOtp from "../auth/VerifyOtp";
import UpdatePassword from "../auth/UpdatePassword";
import Main from "../layout/Main";
import DashboardHome from "../dashboard/home/DashboardHome";
import Notification from "../dashboard/menu/headermenu/Notification";
import Profile from "../dashboard/menu/headermenu/Profile";
import EditProfiel from "../dashboard/menu/headermenu/EditProfile";

import EditPrivacy from "../dashboard/menu/privacypolicy/EditPrivacy";
import PrivacyPolicy from "../dashboard/menu/privacypolicy/PrivacyPolicy";
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
import Order from "../dashboard/Order/Order";
import OrderDetails from "../dashboard/Order/OrderDetails";
import WithdrawRequest from "../dashboard/WithdrawRequest/WithdrawRequest";
import BookedLavTest from "../dashboard/BookedLavTest/BookedLavTest";
import OnboardingVideo from "../dashboard/OnboardingVideo/OnboardingVideo";
import ViewProfileSpecialist from "../dashboard/menu/sidebarMenu/ViewProfileSpecialist";
import Subscription from "../dashboard/Subscription/Subscription";
import SuplifyHotspot from "../dashboard/SuplifyHotspot/SuplifyHotspot";
import HireSpecialistRequests from "../dashboard/HireSpecialistRequests/HireSpecialistRequests";
import ViseSubRequest from "../dashboard/Subscription/ViseSubRequest";
import Questions from "../dashboard/Questions/Questions";
import ViewAllQuestionsAnswer from "../dashboard/menu/sidebarMenu/ViewAllQuestionsAnswer";


const router = createBrowserRouter([
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
                path: "order",
                element: <Order />
            },
            {
                path: "order/:id",
                element: <OrderDetails />
            },
            {
                path: "withdraw-request",
                element: <WithdrawRequest />
            },
            {
                path: "booked-lab-test",
                element: <BookedLavTest />
            },
            {
                path: "suplify-hotspot",
                element: <SuplifyHotspot />
            },
            {
                path: "hire-specialist-requests",
                element: <HireSpecialistRequests />
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
                path: "user",
                element: <User />
            },
            {
                path: "user/view-user/:id",
                element: <ViewProfile />
            },
            {
                path: "user/specialist/:id",
                element: <ViewProfileSpecialist />
            },
            {
                path: "user/patiant/questions/:id",
                element: <ViewAllQuestionsAnswer />
            },

            {
                path: "onboarding-video",
                element: <OnboardingVideo />
            },
            {
                path: "subscription",
                element: <Subscription />
            },
            {
                path: "vise-requests",
                element: <ViseSubRequest />
            },
            {
                path: "questions",
                element: <Questions />
            },

            {
                path: 'settings',
                element: <Settings />
            },
            {
                path: 'settings/privacypolicy',
                element: <PrivacyPolicy />
            },
            {
                path: 'settings/editprivacypolicy',
                element: <EditPrivacy />
            },
            {
                path: "settings/termcondition",
                element: <TermCondition />
            },
            {
                path: "settings/edittermcondition",
                element: <EditTermCondition />
            },
            {
                path: 'settings/about',
                element: <About />
            },
            {
                path: 'settings/editabout',
                element: <EditAbout />
            },
        ]
    }
])

export default router