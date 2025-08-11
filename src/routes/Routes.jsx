import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/authentication/Login";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import CheckCode from "../pages/authentication/CheckCode";
import SetNewPassword from "../pages/authentication/SetNewPassword";
import Signup from "../pages/authentication/Signup";
import VerifyCode from "../pages/authentication/VerifyCode";
import Home from "../pages/home/Home";

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
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
