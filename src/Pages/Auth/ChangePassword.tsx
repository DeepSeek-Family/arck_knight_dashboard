import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "@/redux/apiSlices/authSlice";

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ErrorMessages {
  newPassError?: string;
  conPassError?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const ChangePassword = () => {
  const [form] = Form.useForm<ChangePasswordFormValues>();
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    newPassError: "",
    conPassError: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const validatePasswordChange = (
    values: ChangePasswordFormValues
  ): ErrorMessages => {
    const errors: ErrorMessages = {};

    if (values.currentPassword === values.newPassword) {
      errors.newPassError =
        "The New password is similar to the old Password";
    }

    if (values.newPassword !== values.confirmPassword) {
      errors.conPassError = "New Password and Confirm Password don't match";
    }

    setErrorMessages(errors);
    return errors;
  };

  const onFinish = async (values: ChangePasswordFormValues) => {
    const errors = validatePasswordChange(values);

    if (Object.keys(errors).length === 0) {
      try {
        const res = (await changePassword({
          // @ts-ignore
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }).unwrap()) as ApiResponse;

        if (res.success) {
          toast.success("Password changed successfully");
          form.resetFields();
        } else {
          toast.error(res.message || "Password change failed");
        }
      } catch (err: any) {
        console.error("Error changing password:", err);
        toast.error(
          err?.data?.message || "An error occurred while changing the password"
        );
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl h-[700px]">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="w-[50%] mx-auto mt-20"
      >
        <Form.Item
          name="currentPassword"
          label={<p>Current Password</p>}
          rules={[{ required: true, message: "Please Enter Current Password!" }]}
        >
          <Input.Password
            style={{ background: "transparent" }}
            placeholder="Enter current password"
            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500"
          />
        </Form.Item>

        {errorMessages.newPassError && (
          <p style={{ color: "red" }}>{errorMessages.newPassError}</p>
        )}

        <Form.Item
          name="newPassword"
          label={<p>New Password</p>}
          rules={[{ required: true, message: "Please Enter New Password!" }]}
        >
          <Input.Password
            style={{ background: "transparent" }}
            placeholder="Enter new password"
            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500"
          />
        </Form.Item>

        {errorMessages.conPassError && (
          <p style={{ color: "red" }}>{errorMessages.conPassError}</p>
        )}

        <Form.Item
          name="confirmPassword"
          label={<p>Confirm Password</p>}
          rules={[
            { required: true, message: "Please Enter Confirm Password!" },
          ]}
        >
          <Input.Password
            style={{ background: "transparent" }}
            placeholder="Enter confirm password"
            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500"
          />
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            htmlType="submit"
            block
            style={{
              width: 178,
              height: 48,
              fontWeight: "400px",
              background: "#3f51b5",
              color: "white",
              cursor: "pointer",
            }}
            className="roboto-medium text-sm leading-4"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
