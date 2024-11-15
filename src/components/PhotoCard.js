import React from "react";
import { Avatar, Button } from "antd";

function PhotoCard({ photo, selectedUser }) {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-2">
      {/* Image Section */}
      <div className="relative group">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
        />
        {/* Overlay effect on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-25 transition-all duration-300 opacity-0 group-hover:opacity-100 flex justify-center items-center">
          <Button
            type="primary"
            shape="round"
            size="large"
            className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300 transform group-hover:scale-110"
          >
            View Image
          </Button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 transition-transform duration-500 group-hover:translate-y-3">
        <h3 className="text-2xl font-semibold text-gray-800 truncate hover:text-green-600 transition-colors duration-300 transform group-hover:translate-x-2">
          {photo.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mt-3 mb-4 transition-all duration-300 group-hover:text-gray-700 group-hover:font-medium">
          {photo.description}
        </p>

        {/* User Profile Section */}
        {selectedUser && (
          <div className="flex items-center space-x-4 mt-6 transition-all duration-500 opacity-0 group-hover:opacity-100">
            <Avatar
              src={`https://www.gravatar.com/avatar/${selectedUser.email}`}
              size={64}
              className="border-4 border-green-600 shadow-xl transition-transform duration-500 group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-800">{selectedUser.name}</span>
              <span className="text-sm text-gray-500">{selectedUser.email}</span>
              <Button
                type="link"
                className="text-green-600 font-medium hover:text-green-700 transition-colors duration-300 mt-2"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer with Action Buttons */}
      <div className="p-6 bg-gray-50 flex justify-between items-center rounded-b-xl transition-transform duration-500 group-hover:translate-y-3">
        <Button
          type="default"
          size="large"
          className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 rounded-md"
        >
          Share
        </Button>
        <Button
          type="primary"
          size="large"
          className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300 rounded-md"
        >
          Like
        </Button>
      </div>
    </div>
  );
}

export default PhotoCard;
