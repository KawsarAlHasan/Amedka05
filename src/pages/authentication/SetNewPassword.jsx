import loginImage from "../../assets/images/login-image.jpg";
import { Button, Input, message, Typography } from "antd";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/api";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const { Title, Text } = Typography;

function SetNewPassword() {
  const router = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userEmail = localStorage.getItem("email");
  const otp = localStorage.getItem("otp");

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await API.post("/forgot-password/set-new-password", {
        email: userEmail,
        otp: otp,
        password: data.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        message.success("Set new password successful!", 1).then(() => {
          window.location.reload();
        });
        router("/");
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to set new password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const password = watch("password");

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
                <div className="lg:hidden mb-7 mt-[-60px]">
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
                    Set a new password
                  </Title>
                  <Text type="secondary" className="text-sm sm:text-base">
                    Create a new password. Ensure it differs from previous ones
                    for security
                  </Text>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  {/* New Password Field */}
                  <div className="ant-form-item !mb-4">
                    <label className="ant-form-item-label">
                      <span className="ant-form-item-no-colon">
                        New Password
                      </span>
                    </label>
                    <div className="ant-form-item-control">
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Input.Password
                            {...field}
                            size="large"
                            placeholder="Enter your new password"
                            className="!py-2 !rounded-lg"
                            status={errors.password ? "error" : ""}
                          />
                        )}
                      />
                      {errors.password && (
                        <div className="ant-form-item-explain-error text-red-600">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="ant-form-item !mb-6">
                    <label className="ant-form-item-label">
                      <span className="ant-form-item-no-colon">
                        Confirm Password
                      </span>
                    </label>
                    <div className="ant-form-item-control">
                      <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        }}
                        render={({ field }) => (
                          <Input.Password
                            {...field}
                            size="large"
                            placeholder="Confirm your new password"
                            className="!py-2 !rounded-lg"
                            status={errors.confirmPassword ? "error" : ""}
                          />
                        )}
                      />
                      {errors.confirmPassword && (
                        <div className="ant-form-item-explain-error text-red-600">
                          {errors.confirmPassword.message}
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
                      Reset Password
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

export default SetNewPassword;
