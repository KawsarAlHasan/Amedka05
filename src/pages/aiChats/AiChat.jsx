import productImage from "../../assets/images/car.png";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds X1",
    image: productImage,
    price: 19.99,
    oldPrice: 25.99,
    isHot: true,
  },
  {
    id: 2,
    name: "Gaming Mouse Pro",
    image: productImage,
    price: 35.5,
    oldPrice: 42.0,
    isHot: false,
  },
  {
    id: 3,
    name: "Bluetooth Speaker S2",
    image: productImage,
    price: 49.99,
    oldPrice: 59.99,
    isHot: true,
  },
  {
    id: 4,
    name: "Mechanical Keyboard K7",
    image: productImage,
    price: 75.0,
    oldPrice: 89.0,
    isHot: false,
  },
  {
    id: 5,
    name: "Smartwatch Vibe",
    image: productImage,
    price: 120.0,
    oldPrice: 150.0,
    isHot: true,
  },
  {
    id: 11,
    name: "USB-C Hub 7-in-1",
    image: productImage,
    price: 29.99,
    oldPrice: 39.99,
    isHot: false,
  },
  {
    id: 12,
    name: "4K Action Camera",
    image: productImage,
    price: 180.0,
    oldPrice: 220.0,
    isHot: true,
  },
  {
    id: 13,
    name: "Wireless Charger Pad",
    image: productImage,
    price: 15.5,
    oldPrice: 20.0,
    isHot: false,
  },
  {
    id: 14,
    name: "Noise Cancelling Headset",
    image: productImage,
    price: 89.99,
    oldPrice: 110.0,
    isHot: true,
  },
  {
    id: 15,
    name: "Portable SSD 1TB",
    image: productImage,
    price: 130.0,
    oldPrice: 160.0,
    isHot: false,
  },
  {
    id: 21,
    name: "Drone Mini X5",
    image: productImage,
    price: 220.0,
    oldPrice: 260.0,
    isHot: true,
  },
  {
    id: 22,
    name: "VR Headset Z3",
    image: productImage,
    price: 300.0,
    oldPrice: 350.0,
    isHot: true,
  },
  {
    id: 23,
    name: "Smart Home Camera",
    image: productImage,
    price: 55.0,
    oldPrice: 70.0,
    isHot: false,
  },
  {
    id: 24,
    name: "Fitness Band 4",
    image: productImage,
    price: 45.0,
    oldPrice: 60.0,
    isHot: true,
  },
  {
    id: 25,
    name: "Laptop Stand Adjustable",
    image: productImage,
    price: 25.0,
    oldPrice: 35.0,
    isHot: false,
  },
];

import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiSend } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { Input, Button } from "antd";
import ProductCard from "../../components/ProductCard";

function AiChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial bot message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Show me winter jackets under $50.",
        sender: "user",
      },
      {
        id: 2,
        text: "Here are some winter jackets under $50 from your selected agent, Hipobuy. Would you like to filter by color or brand?",
        sender: "bot",
        products: products.slice(0, 5),
      },
    ]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = {};

      if (
        inputValue.toLowerCase().includes("filter") ||
        inputValue.toLowerCase().includes("color") ||
        inputValue.toLowerCase().includes("brand")
      ) {
        botResponse = {
          id: messages.length + 2,
          text: "Sure! Please select your preferred filters below.",
          sender: "bot",
          showFilters: true,
        };
      } else if (
        inputValue.toLowerCase().includes("price") ||
        inputValue.toLowerCase().includes("expensive")
      ) {
        botResponse = {
          id: messages.length + 2,
          text: "Finding similar jackets in high price...",
          sender: "bot",
          showAnalyzing: true,
        };

        // After another delay, show high-priced products
        setTimeout(() => {
          const expensiveProducts = products.filter((p) => p.price > 100);
          const expensiveMessage = {
            id: messages.length + 3,
            text: "Here are some premium options:",
            sender: "bot",
            products: expensiveProducts.slice(0, 4),
          };
          setMessages((prev) => [...prev, expensiveMessage]);
        }, 2000);
      } else {
        botResponse = {
          id: messages.length + 2,
          text: "I can help you find products based on your preferences. You can ask me to filter by color or brand, or find higher-priced alternatives.",
          sender: "bot",
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex h-[89vh]">
      <div className="flex-1 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto lg:p-4 scrollbar-hide ">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 ${
                message.sender === "user" ? "flex justify-end" : ""
              }`}
            >
              {message.sender === "bot" ? (
                <div className="flex items-start">
                  <div className="w-6 h-6 lg:w-8 lg:h-8  rounded-full bg-[#1f1f1f] flex items-center justify-center mr-1 lg:mr-3">
                    <BsLightningChargeFill className="text-blue-600" />
                  </div>
                  <div className="bg-[#1f1f1f] p-4 rounded-lg shadow-sm max-w-3xl">
                    <p className="">{message.text}</p>

                    {message.showAnalyzing && (
                      <div className="mt-4 p-4 bg-[#1f1f1f] rounded-lg flex items-center">
                        <div className="animate-pulse bg-blue-600 w-4 h-4 rounded-full mr-2"></div>
                        <div className="animate-pulse bg-blue-600 w-4 h-4 rounded-full mr-2"></div>
                        <div className="animate-pulse bg-blue-600 w-4 h-4 rounded-full mr-2"></div>
                        <span className="text-gray-600 ml-2">
                          Analyzing your photo...
                        </span>
                      </div>
                    )}

                    {message.products && (
                      <div className="mt-4">
                        <div className="flex flex-col">
                          <div className="flex overflow-x-auto pb-4 -mx-2 px-2 gap-1 flex-wrap">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                              {message.products
                                .slice(
                                  0,
                                  message.showAll ? message.products.length : 3
                                )
                                .map((product) => (
                                  <ProductCard
                                    key={product.id}
                                    product={product}
                                  />
                                ))}
                            </div>
                          </div>

                          {message.products.length > 3 && !message.showAll && (
                            <button
                              onClick={() => {
                                setMessages((prev) =>
                                  prev.map((msg) =>
                                    msg.id === message.id
                                      ? { ...msg, showAll: true }
                                      : msg
                                  )
                                );
                              }}
                              className="mt-2 text-blue-500 hover:underline"
                            >
                              See More
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-[#1f1f1f] text-white p-3 rounded-lg max-w-md">
                  {message.text}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start mb-6">
              <div className="w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center mr-3">
                <BsLightningChargeFill className="text-blue-600" />
              </div>
              <div className="bg-[#1f1f1f] p-4 rounded-lg shadow-sm">
                <div className="flex">
                  <div className="animate-pulse bg-gray-400 w-2 h-2 rounded-full mr-1"></div>
                  <div className="animate-pulse bg-gray-400 w-2 h-2 rounded-full mr-1"></div>
                  <div className="animate-pulse bg-gray-400 w-2 h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className=" border-t ">
          <div className="flex items-center mt-4">
            <Input
              placeholder="Ask about products, filters, or anything else..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleSendMessage}
              prefix={<FiSearch className="" />}
              className="!rounded-l-full !bg-[#3a3a3a] !text-white hover:!border-amber-50 rounded-r-none py-2 "
            />

            <Button
              type="primary"
              icon={<FiSend />}
              className="rounded-l-none !rounded-r-full h-10 px-4 custom-primary-btn "
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiChat;
