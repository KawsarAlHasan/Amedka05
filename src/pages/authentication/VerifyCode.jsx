import React from "react";
import loginImage from "../../assets/images/login-image.jpg";
import { Button, Input, Typography, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function VerifyCode() {
  const router = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Verify logic here
    router("/");
  };

  const handleResend = () => {
    console.log("Resend code");
    // Resend OTP logic here
  };

  return (
    <div className="bg-[#eddac0] min-h-screen flex items-center justify-center">
      <div className="w-full container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 shadow-2xl rounded-4xl overflow-hidden">
          {/* Image Section */}
          <div className="hidden lg:block lg:col-span-2 h-full">
            <img
              src={loginImage}
              className="w-full h-full object-cover"
              alt="login"
              style={{ minHeight: "600px" }}
            />
          </div>

          {/* Form Section */}
          <div className="lg:col-span-3 bg-white rounded-4xl lg:ml-[-30px]">
            <div className="flex justify-center items-center min-h-[600px] lg:min-h-[850px]">
              <div className="w-full max-w-md px-6 py-12 sm:px-10 sm:py-16 lg:px-0">
                <div className="text-center mb-10">
                  <Title
                    level={2}
                    className="!text-3xl sm:!text-4xl !mb-2 !font-semibold"
                  >
                    Check your email
                  </Title>
                  <Text type="secondary" className="text-sm sm:text-base">
                    We sent a code to your email address. Please check your
                    email for the 5-digit code.
                  </Text>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  {/* OTP Field */}
                  <div className="ant-form-item !mb-6 text-center">
                    <label className="ant-form-item-label block mb-2">
                      <span className="ant-form-item-no-colon">OTP</span>
                    </label>
                    <Controller
                      name="otp"
                      control={control}
                      rules={{
                        required: "OTP is required",
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "Please enter a valid 5-digit code",
                        },
                      }}
                      render={({ field }) => (
                        <Input.OTP
                          {...field}
                          length={6}
                          inputType="number"
                          value={watch("otp")}
                          onChange={(val) => setValue("otp", val)}
                          inputStyle={{
                            width: 50,
                            height: 50,
                            fontSize: 18,
                            margin: "0 4px",
                            textAlign: "center",
                          }}
                        />
                      )}
                    />
                    {errors.otp && (
                      <div className="ant-form-item-explain-error text-red-500 mt-2">
                        {errors.otp.message}
                      </div>
                    )}
                  </div>

                  <div className="ant-form-item !mb-6">
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      className="!h-11 !rounded-lg !text-base !font-medium"
                    >
                      Verify
                    </Button>
                  </div>
                </form>
                <div className="text-center">
                  <Text type="secondary" className="text-sm sm:text-base">
                    Haven’t got the email yet?{" "}
                    <button
                      onClick={handleResend}
                      type="button"
                      className="!font-medium cursor-pointer !text-[#0077b6]"
                    >
                      Resend email
                    </button>
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyCode;
