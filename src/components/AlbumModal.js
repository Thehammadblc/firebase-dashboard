import { useState } from "react";
import { Modal, Input, Form, Button } from "antd";
import { db } from "../config/firebaseConfig"; // Ensure this imports correctly
import { collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion"; // Import Framer Motion

function AlbumModal({ onClose }) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission and add album to Firestore
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "albums"), {
        title: values.title,
        description: values.description,
        coverImage: values.coverImage,
      });

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error adding album: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Modal
        title={
          <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-wide">
            Create a New Album
          </h2>
        }
        visible
        onCancel={onClose}
        footer={null}
        centered
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-xl border border-gray-200"
        width={500} // Custom width for better modal size
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-6 p-6"
        >
          {/* Album Title Input */}
          <Form.Item
            name="title"
            label={<label className="text-gray-700 font-semibold">Album Title</label>}
            rules={[{ required: true, message: "Please enter the album title" }]}
          >
            <Input
              placeholder="E.g., Summer Vibes"
              className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 bg-gray-50 transform transition-all duration-300 hover:scale-105"
            />
          </Form.Item>

          {/* Album Description Input */}
          <Form.Item
            name="description"
            label={<label className="text-gray-700 font-semibold">Description</label>}
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Describe the theme of this album"
              className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 bg-gray-50 transform transition-all duration-300 hover:scale-105"
            />
          </Form.Item>

          {/* Album Cover Image URL */}
          <Form.Item
            name="coverImage"
            label={<label className="text-gray-700 font-semibold">Cover Image URL</label>}
            rules={[{ required: true, message: "Please enter a cover image URL" }]}
          >
            <Input
              placeholder="Enter a URL for the cover image"
              className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 bg-gray-50 transform transition-all duration-300 hover:scale-105"
            />
          </Form.Item>

          {/* Modal Footer - Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button
              onClick={onClose}
              className="px-5 py-2 border rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="px-5 py-2 text-white font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Add Album
            </Button>
          </div>
        </Form>
      </Modal>
    </motion.div>
  );
}

export default AlbumModal;
