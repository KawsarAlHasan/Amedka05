import { useState, useEffect } from "react";
import loginImage from "../../assets/images/login-image.jpg";
import { Button, Input, Typography, Form, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/api";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const { Title, Text } = Typography;

function VerifyCode() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeSending, setCodeSending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true); // Initially disable resend button
  const [timer, setTimer] = useState(60); // 60 seconds countdown
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

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    // Start timer when component mounts
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval); // Cleanup timer on unmount
    } else {
      setResendDisabled(false); // Enable resend button when timer reaches 0
    }
  }, [timer]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await API.post("/auth/email-verify", {
        email: userEmail,
        otp: data.otp,
      });

      localStorage.setItem("token", response.data.token);

      message.success("Login successful!", 1).then(() => {
        window.location.reload();
      });

      router("/");
    } catch (error) {
      console.error(error);
      message.error(
        error?.response?.data?.message ||
          "Email verification failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setCodeSending(true);
    try {
      const response = await API.post("/auth/email-resend-code", {
        email: userEmail,
      });

      if (response.status === 200) {
        setResendDisabled(true);
        setTimer(60);

        message.success("Code sent successfully! Please check your email.");
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          "Resend code failed. Please try again."
      );
    } finally {
      setCodeSending(false);
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
                    Check your email
                  </Title>
                  <Text type="secondary" className="text-sm sm:text-base">
                    We sent a code to your email address. Please check your
                    email for the 6-digit code.
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
                      loading={isSubmitting}
                      disabled={isSubmitting}
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
                      disabled={resendDisabled} // Disable the button when resend is not allowed
                      type="button"
                      className={`font-medium !text-[#0077b6] ${
                        resendDisabled || codeSending
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      {resendDisabled
                        ? `Resend in ${timer}s`
                        : codeSending
                        ? "Sending..."
                        : "Resend email"}
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
