import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../api/axios';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 state untuk gambar aktif
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    axios.get(`/services`)
      .then(response => {
        const found = response.data.data.find(
          s => s.id === parseInt(id)
        );
        setService(found);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  // 🔥 fungsi next & prev
  const nextImage = () => {
    if (!service) return;
    setActiveImage(prev =>
      prev === service.portfolio_urls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!service) return;
    setActiveImage(prev =>
      prev === 0 ? service.portfolio_urls.length - 1 : prev - 1
    );
  };

  if (loading) return <div className="p-10 text-center">Memuat data...</div>;
  if (!service) return <div className="p-10 text-center">Jasa tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Tombol Kembali */}
      <div className="max-w-6xl mx-auto p-6">
        <Link to="/" className="text-blue-600 font-medium hover:underline">
          ← Kembali ke Katalog
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* 🔥 KIRI: GALERI */}
        <div className="space-y-4">
          
          {/* Gambar utama + tombol */}
          <div className="relative">
            <img 
              src={service.portfolio_urls[activeImage]} 
              className="w-full h-96 object-cover rounded-3xl shadow-lg" 
              alt="Main"
            />

            {/* tombol kiri */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
            >
              ‹
            </button>

            {/* tombol kanan */}
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
            >
              ›
            </button>
          </div>

          {/* thumbnail */}
          <div className="grid grid-cols-3 gap-4">
            {service.portfolio_urls.map((url, index) => (
              <img 
                key={index} 
                src={url} 
                onClick={() => setActiveImage(index)}
                className={`w-full h-24 object-cover rounded-xl cursor-pointer transition ${
                  activeImage === index
                    ? 'ring-2 ring-blue-500'
                    : 'hover:opacity-80'
                }`}
              />
            ))}
          </div>

        </div>

        {/* 🔥 KANAN: INFORMASI */}
        <div className="flex flex-col">
          
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
            {service.category?.name}
          </span>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {service.name}
          </h1>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-sm italic">Disediakan oleh:</p>
            <h3 className="text-lg font-bold text-gray-800">
              {service.user?.vendor_profile?.business_name}
            </h3>
            <p className="text-gray-600 text-sm">
              {service.user?.vendor_profile?.address}
            </p>
          </div>

          <div className="mt-8">
            <h4 className="font-bold text-gray-800 text-lg">
              Deskripsi Jasa
            </h4>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="mt-auto pt-10 flex items-center justify-between border-t border-gray-100">
            <div>
              <p className="text-gray-400 text-sm">Harga Mulai Dari</p>
              <p className="text-3xl font-black text-blue-600">
                Rp {parseInt(service.price).toLocaleString('id-ID')}
              </p>
            </div>

            <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1">
              Pesan Sekarang
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}