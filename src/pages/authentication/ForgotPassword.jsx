import loginImage from "../../assets/images/login-image.jpg";
import { Button, Input, Typography, Checkbox, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/api";
import { useState } from "react";

const { Title, Text } = Typography;

function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await API.post("/forgot-password/send-reset-code", data);

      if (response.status === 200) {
        localStorage.setItem("email", data.email);
        message.success("Email sent successfully! Please check your email.");
        router("/check-code");
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Forgot password failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#eddac0] min-h-screen flex items-center justify-center">
      <div className="w-full container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 shadow-2xl rounded-4xl overflow-hidden">
          {/* Image Section */}
          <div className="relative hidden lg:block lg:col-span-2 h-full">
            {/* Desktop/Large: Back button over the image */}
            <IoArrowBackCircleOutline
              size={40}
              onClick={() => router(-1)}
              aria-label="Go back"
              className="absolute top-4 left-4 cursor-pointer drop-shadow-lg hover:scale-105 transition text-white"
            />
            <img
              src={loginImage}
              className="w-full h-full object-cover"
              alt="login"
              style={{ minHeight: "600px" }}
            />
          </div>

          {/* Form Section */}
          <div className="lg:col-span-3 bg-white rounded-4xl lg:ml-[-30px] mx-3 md:mx-0">
            <div className="flex justify-center items-center min-h-[600px] lg:min-h-[850px]">
              <div className="w-full max-w-md px-6 py-12 sm:px-10 sm:py-16 lg:px-0">
                {/* Mobile/Tablet: Back button above the form header */}
                <div className="lg:hidden mb-[100px] mt-[-130px]">
                  <IoArrowBackCircleOutline
                    size={40}
                    onClick={() => router(-1)}
                    aria-label="Go back"
                    className="cursor-pointer hover:scale-105 transition text-gray-700"
                  />
                </div>
                <div className="text-center mb-10">
                  <Title
                    level={2}
                    className="!text-3xl sm:!text-4xl !mb-2 !font-semibold"
                  >
                    Forget password
                  </Title>
                  <Text type="secondary" className="text-sm sm:text-base">
                    Please enter your email to get verification code
                  </Text>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  {/* Email Field */}
                  <div className="ant-form-item !mb-6">
                    <label className="ant-form-item-label">
                      <span className="ant-form-item-no-colon">Email</span>
                    </label>
                    <div className="ant-form-item-control">
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: (
                              <span className="text-red-600">
                                Invalid email address{" "}
                              </span>
                            ),
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            size="large"
                            placeholder="Enter your email"
                            className="!py-2 !rounded-lg"
                            status={errors.email ? "error" : ""}
                          />
                        )}
                      />
                      {errors.email && (
                        <div className="ant-form-item-explain-error">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ant-form-item !mb-6">
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      className="!h-11 !rounded-lg !text-base !font-medium"
                    >
                      Get Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
