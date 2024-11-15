import { useState } from "react";
import { Button, Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../config/firebaseConfig";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle file selection
  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setSelectedFile(info.file.originFileObj);
    } else {
      setSelectedFile(null);
    }
  };

  // Handle upload to Firebase
  const handleUpload = async () => {
    if (!selectedFile) {
      message.error("Please select a file first!");
      return;
    }

    const storageRef = ref(storage, `photos/${selectedFile.name}`);
    try {
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "photos"), {
        url: downloadURL,
        name: selectedFile.name,
        timestamp: new Date(),
      });

      message.success("Image uploaded successfully!");
      setIsModalVisible(false);
      setSelectedFile(null);
    } catch (error) {
      message.error("Error uploading image: " + error.message);
    }
  };

  return (
    <div className="relative">
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        icon={<UploadOutlined />}
        className="bg-green-600 text-white border-none rounded-lg px-6 py-3 transition-all duration-300 transform hover:bg-green-700 hover:scale-105 focus:outline-none"
      >
        Upload Image
      </Button>

      <Modal
        title="Upload Image"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsModalVisible(false)}
            className="text-green-600 border-green-600 hover:text-white hover:bg-green-600 rounded-lg px-6 py-2 transition duration-300"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleUpload}
            className="bg-green-600 border-none text-white rounded-lg px-6 py-2 hover:bg-green-700 transition duration-300 focus:outline-none"
          >
            Upload
          </Button>,
        ]}
        className="rounded-lg p-6 shadow-lg bg-white"
        centered
        width={500}
      >
        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          showUploadList={false}
        >
          <Button
            icon={<UploadOutlined />}
            className="bg-green-500 text-white border-none rounded-lg px-6 py-2 hover:bg-green-600 transition-all duration-300"
          >
            Select Image
          </Button>
        </Upload>
        {selectedFile && (
          <p className="mt-3 text-gray-800 text-sm font-medium">
            Selected file: <span className="font-bold">{selectedFile.name}</span>
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ImageUpload;
