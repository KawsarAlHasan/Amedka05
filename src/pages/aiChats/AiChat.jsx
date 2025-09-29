import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiSend } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { Input, Button } from "antd";
import ProductCard from "../../components/ProductCard";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";

function AiChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [sessionId, setSessionId] = useState("");

  // Initial bot message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI shopping assistant. How can I help you find products today?",
        sender: "bot",
      },
    ]);
  }, []);

  useEffect(() => {
    const newSession = uuidv4();
    setSessionId(newSession);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchProductsByIds = async (productIds) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/ai-search",
        {
          ids: productIds,
        }
      );

      if (response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const handleSendMessage = async () => {
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

    try {
      // Send message to AI API
      const aiResponse = await axios.post(
        "http://10.10.7.75:8005/api/v1/chat",
        {
          thread_id: sessionId,
          user_input: inputValue,
        }
      );

      let products = [];

      // If AI response contains product IDs, fetch product details
      if (
        aiResponse.data.data.products &&
        aiResponse.data.data.products.length > 0
      ) {
        products = await fetchProductsByIds(aiResponse.data.data.products);
      }

      // Create bot response
      const botResponse = {
        id: messages.length + 2,
        text: aiResponse.data.data.message,
        sender: "bot",
      };

      // Add products to response if available
      if (products.length > 0) {
        botResponse.products = products;
      }

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // Error response
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
                    <p className="">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </p>

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
                                    product={{
                                      id: product.id,
                                      name: product.product_name,
                                      image: product.images?.[0] || "",
                                      price:
                                        product.offer_price || product.price,
                                      oldPrice: product.price,
                                      isHot: false,
                                    }}
                                    isTargetBlank={true}
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
