import Navbar from "../components/albumNav";
import AlbumList from "../components/Albumlist";

function AlbumsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 py-4 shadow-md">
        <Navbar />
      </div>

      {/* Album List Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AlbumList />
      </div>
    </div>
  );
}

export default AlbumsPage;
