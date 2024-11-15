import { useState } from "react";
import { Button } from "antd";
import { motion } from "framer-motion";
import AlbumModal from "./AlbumModal";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md">
      <motion.h1
        className="text-2xl font-semibold text-gray-800 md:text-3xl tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Albums
      </motion.h1>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          type="button"
          onClick={handleModalOpen}
          className="px-6 py-2 text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Add Album
        </Button>
      </motion.div>
      {isModalOpen && <AlbumModal onClose={handleModalClose} />}
    </nav>
  );
}

export default Navbar;
