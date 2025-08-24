import React from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "./ScrollToTop";
import { Breadcrumb } from "antd";
import aiImage from "../assets/12122375 1.png";
import InitialLoginModel from "../components/InitialLoginModel";
import InitialCurrencyAgent from "../components/InitialCurrencyAgent";

function MainLayout() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="bg-[#3a3a3a] min-h-screen text-[#FFFFFF] ">
      <div>
        <Navbar />
        <ScrollToTop />
        <InitialLoginModel />
        <InitialCurrencyAgent />

        <div className="container mx-auto px-2 md:px-0  ">
          {location.pathname !== "/" && (
            <div className="mt-6 lg:mt-10">
              <Breadcrumb
                separator={
                  <span className="!text-[#FFFFFF] !text-[16px] font-semibold px-2">
                    {">"}
                  </span>
                }
                items={[
                  {
                    title: (
                      <Link
                        to="/"
                        className="!text-[#FFFFFF] !text-[16px] font-semibold"
                      >
                        Home
                      </Link>
                    ),
                  },
                  ...pathnames.map((name, index) => {
                    const routeTo =
                      "/" + pathnames.slice(0, index + 1).join("/");
                    return {
                      title: (
                        <Link
                          to={routeTo}
                          className="!text-[#FFFFFF] !text-[16px] font-semibold"
                        >
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Link>
                      ),
                    };
                  }),
                ]}
              />
            </div>
          )}

          <Link
            to="/ai-chat"
            className="custom-primary-btn flex items-center gap-2 py-2 px-8 w-[250px] rounded-full cursor-pointer fixed top-[90vh] right-0 !z-100"
          >
            <img src={aiImage} alt="logo" />
            AI Shopping Helper
          </Link>

          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
