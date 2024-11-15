import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import { FaUsers, FaPenSquare, FaImages, FaTasks, FaComments } from "react-icons/fa";
import Users from "./users";
import Posts from "./Posts";
import Albums from "./Albums";
import Photos from "./Photos";
import Todos from "./Todos";
import Comments from "./Comments";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gradient-to-r from-indigo-800 via-purple-900 to-gray-900 text-white">
      
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-20 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-full md:w-1/5 border-r border-indigo-600 min-h-screen overflow-y-auto flex items-center px-6 py-8 bg-opacity-80 bg-gray-900 shadow-xl`}
      >
        <nav className="relative w-full flex flex-col space-y-8 p-6 rounded-lg backdrop-blur-lg border border-purple-600 bg-opacity-80 shadow-lg">
          
          {/* Dashboard Title */}
          <h2 className="text-center text-3xl font-extrabold text-indigo-400 mb-6 tracking-wider">
             Dashboard APPLICATION
          </h2>
          
          {[{ name: "Users", icon: <FaUsers />, path: "users" },
            { name: "Posts", icon: <FaPenSquare />, path: "posts" },
            { name: "Albums", icon: <FaImages />, path: "albums" },
            { name: "Photos", icon: <FaImages />, path: "photos" },
            { name: "Todos", icon: <FaTasks />, path: "todos" },
            { name: "Comments", icon: <FaComments />, path: "comments" }]
            .map((item) => (
              <Link
                key={item.name}
                className="flex items-center font-semibold text-lg px-5 py-3 w-full rounded-xl bg-purple-800 text-white transition duration-300 transform hover:scale-105 hover:bg-indigo-700 hover:text-indigo-200 shadow-md hover:shadow-2xl"
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-4">{item.name}</span>
              </Link>
            ))}
        </nav>
      </div>

      {/* Hamburger Menu Button */}
      <div className="absolute top-4 left-4 md:hidden z-30">
        <HamburgerMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-6 overflow-y-auto bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
        <div className="rounded-lg bg-gray-800 bg-opacity-75 p-8 shadow-2xl">
          <Routes>
            <Route path="users" element={<Users />} />
            <Route path="posts" element={<Posts />} />
            <Route path="albums" element={<Albums />} />
            <Route path="photos" element={<Photos />} />
            <Route path="todos" element={<Todos />} />
            <Route path="comments" element={<Comments />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
