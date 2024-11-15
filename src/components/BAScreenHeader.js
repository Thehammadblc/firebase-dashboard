import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function BAScreenHeader({ title, actionButtons, showBackButton }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-green-700 text-white border rounded-lg shadow-xl mb-6">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-200 text-xl transition-all duration-200 transform hover:scale-105"
          />
        )}
        <h1 className="text-3xl font-bold tracking-wide">{title}</h1>
      </div>
      <div className="flex gap-3">
        {actionButtons.map((button, index) => (
          <div key={index} className="transform transition-transform duration-200 hover:scale-105">
            {button.display()}
          </div>
        ))}
      </div>
    </div>
  );
}
