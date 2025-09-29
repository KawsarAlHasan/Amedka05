import { useState } from "react";
import { FiSearch, FiHeart, FiUser, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/WebSheet.png";
import { logout, useGetAllWishIds, useGetMyProfile } from "../api/api";

import {
  Avatar,
  Dropdown,
  Button,
  Drawer,
  Badge,
  Divider,
  Input,
  Spin,
  message,
} from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { TbCameraPlus } from "react-icons/tb";
import axios from "axios";

function Navbar() {
   const { allWishlistId, refetch } = useGetAllWishIds();
  const { myProfile, isLoading, isError } = useGetMyProfile();
  const [open, setOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  // Handle image search
  const handleImageSearch = async (file) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      message.error("Please select a valid image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      message.error("Image size should be less than 5MB");
      return;
    }

    setSearchLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://10.10.7.75:8005/api/v1/image-analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const { category, color } = response?.data?.data || {};
        if (!category && !color) {
          return message.error(
            "Product not found. Please try with another image."
          );
        }

        message.success("Image search completed!");
        navigate(`/all-products?category=${category}&color=${color}`);
      }
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        message.error("Request timeout. Please try again.");
      } else if (error.response) {
        message.error(
          `Search failed: ${error.response.data.message || "Server error"}`
        );
      } else if (error.request) {
        message.error("Network error. Please check your connection.");
      } else {
        message.error("An unexpected error occurred.");
      }
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle text search
  const productSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchText.trim();
      if (!query) return;
      navigate(`/all-products?product_name=${query}`);
      setSearchText("");
    }
  };

  // Clear search input
  const clearSearch = () => setSearchText("");

  const profileMenuItems = [
    {
      key: "profile",
      label: (
        <div className="!cursor-default">
          <div className="flex gap-2 items-center">
            <Avatar
              size={47}
              src={myProfile?.profilePic}
              icon={<UserOutlined />}
              className="mt-[2px]"
            />
            <div>
              <h2 className="font-semibold">{myProfile?.name || "User"}</h2>
              <p className="bg-[#006699] text-center text-[#FFF] px-3 rounded-full text-sm">
                {myProfile?.status || "Member"}
              </p>
            </div>
          </div>
          <Divider className="!mb-[0px] !mt-[6px] !bg-gray-300 " />
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <span
          onClick={handleLogout}
          className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100"
        >
          <LogoutOutlined /> Logout
        </span>
      ),
    },
  ];

  return (
    <div className="border-b bg-[#3a3a3a] border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-2 md:px-4">
        <nav className="w-full py-3 flex items-center justify-between">
          {/* Left Side: Logo */}
          <div className="flex items-center gap-3">
            <button
              className="block md:hidden text-2xl text-white"
              onClick={() => setOpen(true)}
            >
              <FiMenu />
            </button>
            <Link to="/">
              <img src={logo} alt="logo" className="h-8" />
            </Link>
          </div>

          {/* Middle: Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl px-4">
            <div className="flex items-center w-full bg-[#1f1f1f] text-white rounded-lg px-3 py-[6px] border border-transparent focus-within:border-amber-50">
              <FiSearch className="text-gray-400 mr-2" size={18} />
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search for products name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={productSearch}
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
              />
              {/* Clear Button */}
              {searchText && (
                <button
                  className="mx-2 text-gray-400 hover:text-white"
                  onClick={clearSearch}
                >
                  ✕
                </button>
              )}
              <span className="text-gray-400 mx-4">|</span>
              {/* Camera Upload */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleImageSearch(file);
                    }
                    e.target.value = "";
                  }}
                  disabled={searchLoading}
                />
                {searchLoading ? (
                  <Spin size="small" />
                ) : (
                  <TbCameraPlus
                    title="Search by image"
                    size={20}
                    className="text-gray-300 hover:text-white"
                  />
                )}
              </label>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Profile / Favourite */}
            {myProfile && !isLoading && !isError ? (
              <>
                <Link to="/favourite" className="mx-2 lg:mx-4">
                  <Badge count={allWishlistId?.length} size="small" offset={[0, 5]}>
                    <FiHeart size={26} className="cursor-pointer text-white" />
                  </Badge>
                </Link>

                <Dropdown
                  menu={{ items: profileMenuItems }}
                  trigger={["click"]}
                  placement="bottomRight"
                  overlayClassName="w-64"
                >
                  <Avatar
                    src={myProfile?.profilePic}
                    icon={<UserOutlined />}
                    size="large"
                    className="cursor-pointer !border !border-white hover:opacity-80 transition-opacity"
                  />
                </Dropdown>
              </>
            ) : (
              <Button
                type="primary"
                icon={<FiUser size={18} />}
                onClick={() => navigate("/login")}
                size="middle"
                className="hidden md:flex"
              >
                Account
              </Button>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="flex flex-col gap-4">
          <Input
            size="large"
            placeholder="Search..."
            suffix={<FiSearch size={18} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                productSearch(e);
                setOpen(false);
              }
            }}
          />

          {/* Mobile Image Search */}
          <div className="flex items-center gap-2">
            <label className="flex-1">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleImageSearch(file);
                    setOpen(false);
                  }
                  e.target.value = "";
                }}
                disabled={searchLoading}
              />
              <Button icon={<TbCameraPlus />} block loading={searchLoading}>
                Search by Image
              </Button>
            </label>
          </div>

          <Link to="/favourite" onClick={() => setOpen(false)}>
            <Button icon={<FiHeart />} block>
              Favourite
            </Button>
          </Link>

          {myProfile ? (
            <Button
              type="primary"
              icon={<FiUser size={18} />}
              block
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<FiUser size={18} />}
              block
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
            >
              Account
            </Button>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
