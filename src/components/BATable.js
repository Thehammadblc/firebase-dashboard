import { UserOutlined, PhoneOutlined, MailOutlined, OrderedListOutlined } from '@ant-design/icons';

export default function BATable(props) {
  const { data, columns } = props;

  const getColumnIcon = (key) => {
    switch (key) {
      case 'name':
        return <UserOutlined className="mr-2 text-gray-600" />;
      case 'phone':
        return <PhoneOutlined className="mr-2 text-gray-600" />;
      case 'email':
        return <MailOutlined className="mr-2 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto shadow-xl rounded-lg bg-white p-4">
      <table className="min-w-full bg-white text-gray-700 rounded-lg">
        <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <tr>
            <th className="p-4 text-left text-sm font-semibold border-b-2 border-gray-300 uppercase tracking-wider">
              <OrderedListOutlined className="mr-1" />
            </th>
            {columns.map((column, index) => (
              <th
                key={index}
                className="p-4 text-left text-sm font-semibold border-b-2 border-gray-300 uppercase tracking-wider flex items-center"
              >
                {getColumnIcon(column.key)}
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-green-50 transition-all duration-200 ease-in-out"
              >
                <td className="p-4 border-b border-gray-200 text-center font-medium text-gray-800">
                  {rowIndex + 1}
                </td>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-4 border-b border-gray-200 text-gray-800 font-medium"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="p-4 text-center text-gray-500">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
