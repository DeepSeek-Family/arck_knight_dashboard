import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import User from "../Pages/Dashboard/User";
import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";
import CaseManagement from "../Pages/Dashboard/CaseManagement";
import OfferList from "../components/ui/Settings/OfferList";
import Orders from "../Pages/Dashboard/Orders";
import Vendor from "../Pages/Dashboard/Vendor";
import QuoteHistory from "../Pages/Dashboard/QuoteHistory";
import QuoteUpdate from "../Pages/Dashboard/QuoteUpdate";
import RawMaterial from "../Pages/Dashboard/RawMaterial";
import StandardRecipe from "../Pages/Dashboard/StandardRecipe";
import SingleQuoteUpdate from "../Pages/Dashboard/SingleQuoteUpdate";
import SingleQuoteHistory from "../Pages/Dashboard/SingleQuoteHistory";
import PrivateRoute from "./PrivateRoute";
import PrivacyPolicyPublic from "@/Pages/Dashboard/PrivacyPolicyPublic";
import TermsAndConditionPublic from "@/Pages/Dashboard/TermsAndConditionPublic";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user-management",
        element: <Users />,
      },
      {
        path: "/client/profile/:id",
        element: <User />,
      },
      {
        path: "/case-management",
        element: <CaseManagement />,
      },
      {
        path: "/case-history",
        element: <Vendor />,
      },
      {
        path: "/quote-history",
        element: <QuoteHistory />,
      },
      {
        path: "/quote-history/:id",
        element: <SingleQuoteHistory />,
      },
      {
        path: "/quote-details/:id",
        element: <SingleQuoteUpdate />,
      },
      {
        path: "/quote-update",
        element: <QuoteUpdate />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },
      {
        path: "/raw-material",
        element: <RawMaterial />,
      },
      {
        path: "/standard-recipe",
        element: <StandardRecipe />,
      },

      {
        path: "/personal-information",
        element: <UserProfile />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "offer-list",
        element: <OfferList />,
      },
      {
        path: "orders",
        element: <Orders />,
      },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/public/privacy-policy",
    element: <PrivacyPolicyPublic />,
  },
  {
    path: "/public/terms-and-condition",
    element: <TermsAndConditionPublic />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
