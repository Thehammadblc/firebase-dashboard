import React, { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Button, Modal, Input, message, Spin, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PostCard from '../components/PostCard';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch posts from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Add a new post to Firestore
  const addPost = async () => {
    if (!content.trim() || !profileUrl.trim()) {
      message.warning('Please enter content and profile URL');
      return;
    }

    setLoading(true);
    try {
      const postData = { content, profileUrl, postImage: postImage || '' };
      await addDoc(collection(db, 'posts'), postData);
      message.success('Post added successfully');
      setContent('');
      setProfileUrl('');
      setPostImage(null);
      setIsModalOpen(false);
    } catch (error) {
      message.error('Failed to add post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Edit a post
  const handleEdit = async (postId, newContent, newImage) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { content: newContent, postImage: newImage });
      message.success('Post updated successfully');
    } catch (error) {
      message.error('Failed to update post. Please try again.');
    }
  };

  // Delete a post
  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      message.success('Post deleted successfully');
    } catch (error) {
      message.error('Failed to delete post. Please try again.');
    }
  };

  // Modal for adding new post
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  // Handle image upload
  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setPostImage(reader.result);
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  return (
    <div className="space-y-6 md-py-2 md:pt-1 pt-10">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-gray-700">Post List</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleModalOpen}
          className="bg-green-600 text-white hover:bg-green-700 transform hover:scale-105 transition-transform duration-300"
        >
          Add Post
        </Button>
      </div>

      {/* Loader while posts are loading */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts available</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}

      {/* Modal for adding/editing post */}
      <Modal
        title="Add New Post"
        visible={isModalOpen}
        onOk={addPost}
        onCancel={handleModalClose}
        okText={loading ? <Spin /> : 'Add'}
        cancelText="Cancel"
        okButtonProps={{ disabled: loading }}
        width="90%"  // Set a default width for mobile view
        bodyStyle={{ padding: '15px' }}
        destroyOnClose={true}
        style={{
          maxWidth: '500px',
        }}
        className="transition-all ease-in-out duration-300"
      >
        <div className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700">Content</label>
            <Input.TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              rows={4}
              className="w-full border-gray-300 focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Profile URL</label>
            <Input
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="Enter profile URL"
              className="w-full border-gray-300 focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Post Image</label>
            <Upload beforeUpload={handleImageUpload} showUploadList={false}>
              <Button className="hover:bg-green-500 hover:text-white transition-all duration-300">Upload Post Image</Button>
            </Upload>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Posts;
