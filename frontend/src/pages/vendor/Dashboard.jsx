import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios'; // Pastikan path axios kamu benar

export default function DashboardVendor() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi Fetch Data
  const fetchVendorServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/vendor/services', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Simpan data dari BE ke state
      setServices(response.data.data || []);
    } catch (err) {
      console.error("Gagal mengambil daftar jasa:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus jasa ini?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/vendor/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Filter state agar yang dihapus hilang dari layar tanpa reload
        setServices(services.filter(s => s.id !== id));
        alert("Jasa berhasil dihapus");
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchVendorServices();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Halo, vendor!</h1>
          <p className="text-gray-500 mt-1">Kelola portofolio jasa Evoria kamu di sini.</p>
        </div>
        <Link 
          to="/vendor/add-service" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          + Tambah Jasa Baru
        </Link>
      </div>

      <div className="rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 text-center text-gray-400 font-medium">Menarik data dari database...</div>
        ) : services.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-widest border-b border-gray-50">
                <th className="px-8 py-6">Nama Jasa</th>
                <th className="px-8 py-6">Kategori</th>
                <th className="px-8 py-6 text-right">Deskripi</th>
                <th className="px-8 py-6 text-right">Harga</th>
                <th className="px-8 py-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      {/* portfolio_urls berasal dari @appends di Model Service */}
                      <img 
                        src={item.portfolio_urls?.[0] || 'https://via.placeholder.com/150'} 
                        className="w-14 h-14 rounded-2xl object-cover shadow-sm" 
                        alt="portfolio" 
                      />
                      <span className="font-bold text-gray-800 text-lg">{item.name}</span>
                    </div>
                  </td>
                  {/* <td className="px-8 py-5">
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-extrabold uppercase">
                      {item.category?.name || 'General'}
                    </span>
                  </td> */}
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase w-fit">
                        {item.category?.name || 'General'}
                      </span>
                      {/* Tampilkan Tipe Layanan di bawah Kategori */}
                      <span className="text-xs text-gray-400 font-medium ml-1">
                        Tipe: {item.service_type?.name || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-4 py-1.5 text-black-600 rounded-full text-xs ">
                      {item.description}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center font-bold text-gray-600">
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link to={`/vendor/edit-service/${item.id}`} className="text-blue-600">Edit</Link>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 font-bold ml-4">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* Tampilan Persis Screenshot Kamu */
          <div className="py-28 text-center bg-white">
            <div className="mb-4 text-gray-200 flex justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <p className="text-gray-400 font-bold text-xl">Belum ada jasa yang terdaftar.</p>
            <p className="text-gray-400 text-sm mt-2">Klik "Tambah Jasa Baru" untuk memulai listing pertamamu.</p>
          </div>
        )}
      </div>
    </div>
  );
}