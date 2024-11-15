import React, { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { Table, Button, Modal, Input, message, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map((doc, index) => ({
        id: doc.id,
        number: index + 1,
        ...doc.data(),
      })));
    });
    return unsubscribe;
  }, []);

  const handleUserSubmit = async () => {
    if (!name || !email || !password) return message.warning('All fields are required.');
    setLoading(true);
    try {
      if (editingUserId) {
        const userRef = doc(db, 'users', editingUserId);
        await updateDoc(userRef, { name, email, password });
        message.success('User updated');
        setIsEditModalOpen(false);
      } else {
        await addDoc(collection(db, 'users'), { name, email, password });
        message.success('User added');
        setIsModalOpen(false);
      }
      setName('');
      setEmail('');
      setPassword('');
    } catch {
      message.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      message.success('User deleted');
    } catch {
      message.error('Deletion failed');
    }
  };

  const columns = [
    { title: 'No.', dataIndex: 'number', key: 'number' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <div className="flex gap-4 items-center">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingUserId(user.id);
              setName(user.name);
              setEmail(user.email);
              setPassword(user.password);
              setIsEditModalOpen(true);
            }}
            className="text-blue-500 hover:bg-blue-200 transition duration-300 transform hover:scale-110"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteUser(user.id)}
            danger
            className="text-red-500 hover:bg-red-200 transition duration-300 transform hover:scale-110"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 rounded-lg shadow-xl">
      <header className="flex justify-between items-center text-lg font-semibold text-gray-700">
        <h2 className="text-2xl font-bold">Users List</h2>
        <Button
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-110"
        >
          Add User
        </Button>
      </header>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="bg-white rounded-md shadow-sm transform hover:scale-105 transition duration-300"
      />

      <Modal
        title={editingUserId ? 'Edit User' : 'Add New User'}
        visible={isModalOpen || isEditModalOpen}
        onOk={handleUserSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setIsEditModalOpen(false);
        }}
        okText={loading ? <Spin /> : editingUserId ? 'Update' : 'Add'}
        className="transition duration-300 transform hover:scale-105"
      >
        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-3 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-3 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-3 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Users;
