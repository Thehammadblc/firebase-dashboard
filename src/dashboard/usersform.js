import { useState } from "react";
import { Input, Button, Form, notification } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";
import BAScreenHeader from "../components/BAScreenHeader";
import apiInstance from "../config/apis/axiosconfig";

export default function UsersForm() {
  const [form] = Form.useForm();
  const [saveLoader, setSaveLoader] = useState(false);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      setSaveLoader(true);
      await apiInstance.post("users", values);
      setSaveLoader(false);
      openNotification("success", "User Saved", "User data has been saved successfully.");
      form.resetFields();
    } catch (error) {
      setSaveLoader(false);
      openNotification("error", "Save Failed", "An error occurred while saving the user data.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center pt-20 min-h-screen bg-gradient-to-r from-blue-100 to-blue-50">
        <BAScreenHeader
          title="User Registration"
          showBackButton={true}
          actionButtons={[
            {
              display: () => (
                <Button
                  type="none"
                  className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                  onClick={save}
                  loading={saveLoader}
                >
                  Save
                </Button>
              ),
            },
          ]}
        />

        {/* Form Container */}
        <div className="w-full max-w-lg mt-10 bg-white rounded-xl shadow-xl p-12 border-t-4 border-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <h2 className="text-4xl font-semibold text-center text-blue-700 mb-8">Create New User</h2>

          <Form form={form} className="space-y-8" layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  validator: (_, value) =>
                    value?.trim().length >= 3
                      ? Promise.resolve()
                      : Promise.reject("Name must be at least 3 characters."),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-blue-500" />}
                placeholder="Enter name"
                className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  validator: (_, value) =>
                    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
                      ? Promise.resolve()
                      : Promise.reject("Please enter a valid email address."),
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-blue-500" />}
                placeholder="Enter email"
                className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  validator: (_, value) =>
                    /^\d{10,15}$/.test(value)
                      ? Promise.resolve()
                      : Promise.reject("Phone number should be 10 to 15 digits."),
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="text-blue-500" />}
                placeholder="Enter phone number"
                className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              />
            </Form.Item>

            <Form.Item
              label="Website"
              name="website"
              rules={[
                {
                  validator: (_, value) =>
                    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,7}(\/[\w-]*)*$/.test(value)
                      ? Promise.resolve()
                      : Promise.reject("Please enter a valid URL."),
                },
              ]}
            >
              <Input
                prefix={<GlobalOutlined className="text-blue-500" />}
                placeholder="Enter website"
                className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="w-full py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={save}
                loading={saveLoader}
              >
                Save User
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
