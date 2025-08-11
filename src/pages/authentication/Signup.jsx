import loginImage from "../../assets/images/login-image.jpg";
import { Button, Input, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function Signup() {
  const router = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
      router("/verify-code");
    // Handle signup logic here
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
                    Sign Up
                  </Title>
                  <Text type="secondary" className="text-sm sm:text-base">
                    Welcome back! Please enter your details
                  </Text>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  {/* Name Field */}
                  <div className="ant-form-item !mb-6">
                    <label className="ant-form-item-label">
                      <span className="ant-form-item-no-colon">Name</span>
                    </label>
                    <div className="ant-form-item-control">
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: "Name is required",
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            size="large"
                            placeholder="Enter your name"
                            className="!py-2 !rounded-lg"
                            status={errors.name ? "error" : ""}
                          />
                        )}
                      />
                      {errors.name && (
                        <div className="ant-form-item-explain-error text-red-500">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                  </div>

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
                                Invalid email address
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
                        <div className="ant-form-item-explain-error text-red-500">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="ant-form-item !mb-6">
                    <label className="ant-form-item-label">
                      <span className="ant-form-item-no-colon">Phone</span>
                    </label>
                    <div className="ant-form-item-control">
                      <Controller
                        name="phone"
                        control={control}
                        rules={{
                          required: "Phone number is required",
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            size="large"
                            placeholder="Enter your phone number"
                            className="!py-2 !rounded-lg"
                            status={errors.phone ? "error" : ""}
                          />
                        )}
                      />
                      {errors.phone && (
                        <div className="ant-form-item-explain-error text-red-500">
                          {errors.phone.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="ant-form-item !mb-6">
                    <label className="ant-form-item-label">
                      <span className="ant-form-item-no-colon">Password</span>
                    </label>
                    <div className="ant-form-item-control">
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: (
                              <span className="text-red-600">
                                Password must be at least 6 characters
                              </span>
                            ),
                          },
                        }}
                        render={({ field }) => (
                          <Input.Password
                            {...field}
                            size="large"
                            placeholder="Enter your password"
                            className="!py-2 !rounded-lg"
                            status={errors.password ? "error" : ""}
                          />
                        )}
                      />
                      {errors.password && (
                        <div className="ant-form-item-explain-error text-red-500">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="ant-form-item !mb-6">
                    <label className="ant-form-item-label">
                      <span className="ant-form-item-no-colon">Confirm Password</span>
                    </label>
                    <div className="ant-form-item-control">
                      <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === watch("password") || "Passwords do not match",
                        }}
                        render={({ field }) => (
                          <Input.Password
                            {...field}
                            size="large"
                            placeholder="Confirm your password"
                            className="!py-2 !rounded-lg"
                            status={errors.confirmPassword ? "error" : ""}
                          />
                        )}
                      />
                      {errors.confirmPassword && (
                        <div className="ant-form-item-explain-error text-red-500">
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
                      Sign Up
                    </Button>
                  </div>

                  <div className="text-center">
                    <Text type="secondary" className="text-sm sm:text-base">
                      Already have an account?{" "}
                      <a href="/login" className="!font-medium">
                        Sign in Here
                      </a>
                    </Text>
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

export default Signup;