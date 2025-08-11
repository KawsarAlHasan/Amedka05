import React from "react";
import { Input, Select, Badge, Button } from "antd";
import { FiSearch, FiCamera, FiHeart, FiUser } from "react-icons/fi";

const { Option } = Select;

function Navbar() {
  return (
    <nav className="w-full px-4 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-gray-300">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">WebSheet</div>

      {/* Search bar */}
      <div className="flex-1 max-w-2xl">
        <Input
          size="large"
          placeholder="Search for products, categories or brands..."
          prefix={<FiSearch size={18} />}
          suffix={<FiCamera size={18} />}
          className="w-full"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <Select
          defaultValue="English"
          className="w-28"
          dropdownMatchSelectWidth={false}
        >
          <Option value="English">English</Option>
          <Option value="Bangla">Bangla</Option>
        </Select>

        {/* Wishlist Icon with Badge */}
        <Badge count={2} size="small" offset={[0, 5]}>
          <FiHeart size={22} className="cursor-pointer" />
        </Badge>

        {/* Sign In / Account Button */}
        <Button type="primary" icon={<FiUser size={18} />} size="large">
          Account
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
