import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Input, Modal } from "antd";
import { motion } from "framer-motion"; // Adding framer-motion for animations

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCoverImage, setEditedCoverImage] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      const albumCollection = collection(db, "albums");
      const albumSnapshot = await getDocs(albumCollection);
      const albumList = albumSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlbums(albumList);
    };
    fetchAlbums();
  }, []);

  const handleEditClick = (album) => {
    setIsEditing(true);
    setEditingAlbum(album);
    setEditedTitle(album.title);
    setEditedDescription(album.description);
    setEditedCoverImage(album.coverImage);
  };

  const handleDeleteClick = async (albumId) => {
    try {
      await deleteDoc(doc(db, "albums", albumId));
      setAlbums(albums.filter((album) => album.id !== albumId));
    } catch (error) {
      console.error("Error deleting album: ", error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      await updateDoc(doc(db, "albums", editingAlbum.id), {
        title: editedTitle,
        description: editedDescription,
        coverImage: editedCoverImage,
      });
      setAlbums(albums.map((album) => 
        album.id === editingAlbum.id ? { ...album, title: editedTitle, description: editedDescription, coverImage: editedCoverImage } : album
      ));
      setIsEditing(false);
      setEditingAlbum(null);
    } catch (error) {
      console.error("Error updating album: ", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-center text-4xl font-bold text-white mb-10">Album Collection</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {albums.map((album) => (
          <motion.div
            key={album.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }} // Scale the card when hovered
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <motion.img
                src={album.coverImage}
                alt={album.title}
                className="w-full h-52 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-2xl font-semibold">{album.title}</p>
              </div>
            </div>
            <div className="p-4 text-gray-300">
              <h3 className="text-lg font-semibold truncate">{album.title}</h3>
              <p className="text-sm line-clamp-3 mt-2">{album.description}</p>
              <div className="flex justify-between mt-4">
                <motion.button
                  onClick={() => handleEditClick(album)}
                  className="text-indigo-500 hover:text-indigo-400 border-none"
                  whileHover={{ scale: 1.1 }}
                >
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteClick(album.id)}
                  className="text-red-500 hover:text-red-400 border-none"
                  whileHover={{ scale: 1.1 }}
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isEditing && (
        <Modal
          title="Edit Album"
          visible={isEditing}
          onCancel={() => setIsEditing(false)}
          footer={null}
          centered
          transitionName="fade"
        >
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="bg-gray-800 text-gray-300 border-gray-600"
            />
            <Input.TextArea
              placeholder="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={3}
              className="bg-gray-800 text-gray-300 border-gray-600"
            />
            <Input
              placeholder="Cover Image URL"
              value={editedCoverImage}
              onChange={(e) => setEditedCoverImage(e.target.value)}
              className="bg-gray-800 text-gray-300 border-gray-600"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <motion.button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleUpdateClick}
                className="bg-green-600 text-white hover:bg-green-700"
                whileHover={{ scale: 1.05 }}
              >
                Update
              </motion.button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AlbumList;
