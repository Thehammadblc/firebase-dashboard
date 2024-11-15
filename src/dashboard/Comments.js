import { useEffect, useState } from "react";
import { Spin, Card, Button, Modal, Input, Avatar, Tooltip } from "antd";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { FaTrashAlt, FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Fetch comments from Firebase
  const fetchComments = async () => {
    setLoading(true);
    const commentsCollection = collection(db, "comments");
    const commentsSnapshot = await getDocs(commentsCollection);
    const commentsList = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(commentsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addDoc(collection(db, "comments"), { text: newComment, author: "Admin" });
      fetchComments();
      setNewComment("");
      setShowModal(false);
    }
  };

  const handleDeleteComment = async (id) => {
    await deleteDoc(doc(db, "comments", id));
    fetchComments();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-300 to-blue-300">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 pt-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700">Community Comments</h1>
        <p className="text-md text-gray-700 mt-2">Join the conversation below!</p>
      </div>

      {/* Add Comment Button */}
      <div className="flex justify-center mb-8">
        <Button onClick={() => setShowModal(true)} type="none" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-500 shadow-lg">
          + Add Comment
        </Button>
      </div>

      {/* Comment List */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105">
              {/* Comment Header with Profile Circle */}
              <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-t-xl">
                <Avatar size={48} className="bg-blue-600 text-white">
                  {comment.author ? comment.author.charAt(0) : "A"}
                </Avatar>
                <div>
                  <p className="text-xl font-semibold text-gray-900">{comment.author || "Anonymous"}</p>
                  <p className="text-gray-500 text-sm">Posted a moment ago</p>
                </div>
              </div>

              {/* Comment Content */}
              <div className="p-6">
                <p className="text-gray-800 text-lg">{comment.text}</p>
              </div>

              {/* Comment Actions */}
              <div className="flex justify-between items-center bg-gray-50 rounded-b-xl p-4 border-t">
                <div className="flex space-x-4">
                  <Tooltip title="Like">
                    <Button
                      type="text"
                      icon={<FaRegThumbsUp />}
                      className="text-gray-500 hover:text-blue-600"
                    />
                  </Tooltip>
                  <Tooltip title="Reply">
                    <Button
                      type="text"
                      icon={<FaRegCommentDots />}
                      className="text-gray-500 hover:text-green-600"
                    />
                  </Tooltip>
                </div>
                <Tooltip title="Delete">
                  <Button
                    type="text"
                    icon={<FaTrashAlt />}
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                </Tooltip>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for adding a new comment */}
      <Modal
        title={<span className="text-2xl font-semibold text-gray-700">Add New Comment</span>}
        visible={showModal}
        width={400}
        onOk={handleAddComment}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowModal(false)} className="text-gray-700">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleAddComment}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Add Comment
          </Button>,
        ]}
        centered
      >
        <Input.TextArea
          rows={4}
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="py-3 px-4 mt-4 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
        />
      </Modal>
    </div>
  );
}
