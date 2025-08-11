import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className=" px-6 md:px-16 py-10">
      {/* Newsletter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-600 pb-6 gap-6">
        <div>
          <h2 className="text-xl font-semibold">Join our newsletter</h2>
          <p className="text-gray-400 mt-2">
            Register now to get latest updates on promotions & coupons. Don’t
            worry, we do not spam!
          </p>
        </div>

        <div className="flex w-full md:w-auto">
          <div className="flex items-center border border-gray-500 rounded-l-md px-3 bg-gray-900">
            <FiMail className="text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-transparent outline-none text-white px-2 py-2 w-full md:w-64"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-md font-semibold">
            SEND
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8 text-gray-300">
        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Do You Need Help ?</h3>
          <p>You can contact with us. We will Give you proper solution.</p>
          <div className="mt-4">
            <p className="flex items-center gap-2">
              <FiPhone className="text-blue-500" />
              <span>09638566693</span>
            </p>
            <p className="text-sm text-gray-400">
              Saturday - Thursday : 10am - 11pm
            </p>
          </div>
          <div className="mt-3">
            <p className="flex items-center gap-2">
              <FiMail className="text-blue-500" />
              <span>storenetbd@gmail.com</span>
            </p>
            <p className="text-sm text-gray-400">Need help with your order?</p>
          </div>
        </div>

        {/* Make Money */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Make Money with Us</h3>
          <p className="hover:text-white cursor-pointer">Become an Affiliate</p>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Let Us Help You</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">
              Accessibility Statement
            </li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms and Conditions
            </li>
            <li className="hover:text-white cursor-pointer">Cookie Settings</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* Get to Know */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get to Know Us</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">
              Customer reviews
            </li>
            <li className="hover:text-white cursor-pointer">
              Social Responsibility
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Follow us on social media:
          </h3>
          <div className="flex gap-3 mt-2">
            <a href="#" className="bg-gray-700 hover:bg-blue-500 p-2 rounded">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-black p-2 rounded">
              <FaXTwitter />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-pink-500 p-2 rounded">
              <FaInstagram />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-blue-600 p-2 rounded">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 mt-8 pt-4 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
        <p>
          Copyright 2024 © All right reserved. Powered by{" "}
          <span className="text-blue-500">STORENETBD</span>.
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">
            Terms and Conditions
          </a>
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Order Tracking
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
