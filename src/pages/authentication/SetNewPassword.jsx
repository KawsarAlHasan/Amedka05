import loginImage from "../../assets/images/login-image.jpg";
import { Button, Input, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";

const { Title, Text } = Typography;

function SetNewPassword() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle password reset logic here
  };

  const password = watch("password");

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