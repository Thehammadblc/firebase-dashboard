import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { Form, Input, Button, Typography, message, Divider, Card } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 opacity-80"
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 max-w-lg mx-auto p-6">
        <Card
          className="shadow-xl bg-gradient-to-br from-green-400 to-teal-500"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            padding: "2rem",
          }}
        >
          <Title level={2} className="text-center text-white">
            Admin Login
          </Title>
          <Divider />
          <Text type="secondary" className="block text-center mb-4 text-white">
            Welcome, Admin! Here are the credentials:
            <br />
            <strong>Email: admin123@gmail.com</strong>
            <br />
            <strong>Password: admin1234</strong>
          </Text>
          <Form
            className="bg-white py-6 px-8 rounded-lg shadow-md"
            layout="vertical"
            onFinish={handleLogin}
            style={{ width: "100%" }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                className="rounded-md shadow-sm"
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password
                className="rounded-md shadow-sm"
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="none"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300"
                htmlType="submit"
                loading={loading}
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          {/* Thank You Note */}
          <div className="mt-6 text-center">
            <Text type="success" className="text-white">
             
            </Text>
            <Text type="secondary" className="block mt-2 text-white">
              
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
