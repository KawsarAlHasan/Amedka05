import { useState } from "react";
import { Input, Select, Badge, Button, Drawer, Avatar, Divider } from "antd";
import { FiSearch, FiCamera, FiHeart, FiUser, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/WebSheet.png";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import EditProfile from "./EditProfile";

const { Option } = Select;

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="border-b bg-[#3a3a3a] border-gray-300  sticky top-0 z-50">
      <div className="container mx-auto px-2 md:px-4">
        <nav className="w-full py-3 flex items-center justify-between">
          {/* Left Side: Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Icon */}
            <button
              className="block md:hidden text-2xl"
              onClick={() => setOpen(true)}
            >
              <FiMenu />
            </button>

            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          {/* Middle: Search bar (Hidden in Mobile) */}
          <div className="hidden md:flex flex-1 max-w-2xl px-4">
            <Input
              size="large"
              placeholder="Search for products, categories or brands..."
              // prefix={<FiSearch size={18} />}
              suffix={<FiSearch size={18} />}
              className="w-full !bg-[#1f1f1f] !text-white hover:!border-amber-50 "
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
            <Link to="/favourite" className="mx-2 lg:mx-4">
              <Badge count={2} size="small" offset={[0, 5]}>
                <FiHeart size={26} className="cursor-pointer text-white " />
              </Badge>
            </Link>

            {/* Account */}
            <Button
              type="primary"
              icon={<FiUser size={18} />}
              onClick={handleLogout}
              size="middle"
              className="hidden md:flex"
            >
              Account
            </Button>
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
            // prefix={<FiSearch size={18} />}
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
