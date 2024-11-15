import { MenuOutlined } from "@ant-design/icons";

export default function HamburgerMenu({ isOpen, toggleSidebar }) {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform ${
        isOpen
          ? "bg-green-600 text-white hover:bg-green-700 scale-105"
          : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
      }`}
      onClick={toggleSidebar}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
    >
      <MenuOutlined
        className={`transition-all duration-300 transform ${
          isOpen ? "rotate-180 text-white" : "rotate-0 text-green-600"
        }`}
      />
      <span
        className={`text-xs md:text-sm font-semibold transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        Show navigation
      </span>
      <span
        className={`text-xs md:text-sm font-semibold transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        Close navigation
      </span>
    </button>
  );
}
