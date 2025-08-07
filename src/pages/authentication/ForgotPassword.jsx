import loginImage from "../../assets/images/login-image.jpg";
import { Button, Input, Typography, Checkbox } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function ForgotPassword() {
  const router = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle login logic here
    router("/check-code");
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
