import { useState } from "react";
import { FiSearch, FiCamera, FiHeart, FiUser, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/WebSheet.png";
import EditProfile from "./EditProfile";
import { logout, useGetMyProfile } from "../api/api";

import {
  Avatar,
  Dropdown,
  Button,
  Drawer,
  Badge,
  Divider,
  Input,
  Select,
  Spin,
} from "antd";
import { BellOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Option } = Select;

function Navbar() {
  const { myProfile, isLoading, isError } = useGetMyProfile();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

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
              className="block md:hidden text-2xl"
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
            <Input
              size="large"
              placeholder="Search for products, categories or brands..."
              suffix={<FiSearch size={18} />}
              className="w-full !bg-[#1f1f1f] !text-white hover:!border-amber-50"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Select
                defaultValue="English"
                className="w-28 !rounded-full !bg-[#1f1f1f] !text-white"
                dropdownMatchSelectWidth={false}
              >
                <Option value="English">English</Option>
                <Option value="Bangla">Bangla</Option>
              </Select>
            </div>

            {/* Favourite */}

            {/* Profile Dropdown */}

            {myProfile && !isLoading && !isError ? (
              <>
                <Link to="/favourite" className="mx-2 lg:mx-4">
                  <Badge count={2} size="small" offset={[0, 5]}>
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
                onClick={handleLogout}
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
          />
          <Select
            defaultValue="English"
            className="w-full"
            dropdownMatchSelectWidth={false}
          >
            <Option value="English">English</Option>
            <Option value="Bangla">Bangla</Option>
          </Select>
          <Link to="/favourite" onClick={() => setOpen(false)}>
            <Button icon={<FiHeart />} block>
              Favourite
            </Button>
          </Link>
          <Button
            type="primary"
            icon={<FiUser size={18} />}
            block
            onClick={handleLogout}
          >
            Account
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
