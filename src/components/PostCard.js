import React, { useState } from "react";
import { Card, Button, Modal, Input, Upload, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const PostCard = ({ post, onEdit, onDelete }) => {
  const { id, content, profileUrl, postImage } = post;
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [newImage, setNewImage] = useState(postImage);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSaveEdit = () => {
    if (newContent !== content || newImage !== postImage) {
      onEdit(id, newContent, newImage);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setNewImage(reader.result);
    reader.readAsDataURL(file);
    return false;
  };

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Card
      hoverable
      className="rounded-2xl shadow-lg transition-transform transform hover:scale-105"
      bordered={false}
    >
      <div className="flex items-center space-x-4 p-4">
        <Avatar size={48} src={profileUrl} alt="Profile" className="border-2 border-green-500" />
        <div>
          <h3 className="font-semibold text-lg text-green-800">Admin</h3>
          <p className="text-sm text-gray-500">10/11/2024 - 10:34</p>
        </div>
      </div>

      <div className="py-4 px-6">
        {isEditing ? (
          <>
            <Input.TextArea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
              placeholder="Edit post content"
              className="bg-gray-100 border-none rounded-lg p-3 mb-4"
            />
            <Upload beforeUpload={handleImageUpload} showUploadList={false}>
              <Button className="bg-green-200 hover:bg-green-300 text-green-700 w-full">
                Upload New Image
              </Button>
            </Upload>
          </>
        ) : (
          <div>
            <p>{isExpanded ? content : `${content.slice(0, 100)}...`}</p>
            <Button
              type="link"
              onClick={toggleReadMore}
              className="text-green-600 hover:text-green-800"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </Button>
          </div>
        )}
      </div>

      {postImage && !isEditing && (
        <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
          <img
            alt="Post Image"
            src={postImage}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex justify-between items-center px-6 py-3 border-t text-gray-600">
        <Button type="link" className="text-sm text-green-600" icon={<LikeOutlined />}>
          Like
        </Button>
        <Button type="link" className="text-sm text-green-600" icon={<MessageOutlined />}>
          Comment
        </Button>
        <Button type="link" className="text-sm text-green-600" icon={<ShareAltOutlined />}>
          Share
        </Button>
      </div>

      <div className="flex justify-center space-x-6 bg-gray-100 py-4">
        {!isEditing && (
          <>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </Button>
          </>
        )}
      </div>

      <Modal
        title="Edit Post"
        visible={isEditing}
        onOk={handleSaveEdit}
        onCancel={() => setIsEditing(false)}
        okText="Save"
        cancelText="Cancel"
        bodyStyle={{ padding: "20px" }}
        centered
      >
        <div>
          <label className="block font-medium text-gray-700">Content</label>
          <Input.TextArea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={4}
            placeholder="Edit post content"
            className="bg-gray-100 border-none rounded-lg p-3 mb-4"
          />
          <label className="block font-medium text-gray-700">Post Image</label>
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            <Button className="bg-green-200 hover:bg-green-300 text-green-700">
              Upload New Post Image
            </Button>
          </Upload>
        </div>
      </Modal>
    </Card>
  );
};

export default PostCard;
