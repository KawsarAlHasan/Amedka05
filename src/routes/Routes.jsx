import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/authentication/Login";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import CheckCode from "../pages/authentication/CheckCode";
import SetNewPassword from "../pages/authentication/SetNewPassword";
import Signup from "../pages/authentication/Signup";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/check-code",
    element: <CheckCode />,
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <MainLayout />,
    // children: [
    //   {
    //     path: "/",
    //     element: <Dashboard />,
    //   },
    //   {
    //     path: "/users",
    //     element: <Users />,
    //   },
    //   {
    //     path: "/flagged-content",
    //     element: <FlaggedContent />,
    //   },
    //   {
    //     path: "/payouts",
    //     element: <Payouts />,
    //   },
    //   {
    //     path: "/tasks",
    //     element: <Tasks />,
    //   },
    //   {
    //     path: "/leaderboard",
    //     element: <Leaderboard />,
    //   },
    //   {
    //     path: "/profile",
    //     element: <Profile />,
    //   },
    //   {
    //     path: "/terms-conditions",
    //     element: <TermsConditions />,
    //   },
    //   {
    //     path: "/privacy-policy",
    //     element: <PrivacyPolicy />,
    //   },

    //   {
    //     path: "/test",
    //     element: <Test />,
    //   },
    // ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
