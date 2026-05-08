import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Catalog() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [filters, setFilters] = useState({
    category_id: '',
    service_type_id: ''
  });
  const [loading, setLoading] = useState(false);

  // 1. Ambil data awal (Kategori & Jasa) saat pertama kali buka
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const resCat = await axios.get('/categories');
        setCategories(resCat.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
      }
    };

    fetchInitialData();
    fetchServices(); // Load semua jasa di awal
  }, []);

  // 2. Fungsi Ambil Jasa berdasarkan filter
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/services', { params: filters });
      setServices(response.data.data || []);
    } catch (err) {
      console.error("Gagal mengambil data jasa:", err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Saat Kategori dipilih, ambil tipe layanannya (MUA/Fotografer/dll)
  const handleCategoryChange = async (id) => {
    setFilters({ ...filters, category_id: id, service_type_id: '' });
    
    if (id) {
      try {
        const res = await axios.get(`/categories/${id}/service-types`);
        setServiceTypes(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil tipe layanan:", err);
        setServiceTypes([]);
      }
    } else {
      setServiceTypes([]);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* NAVBAR: Login & Register Vendor */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
            EVORIA<span className="text-orange-500">.</span>
          </Link>

          {/* Navigasi Kanan */}
          <div className="flex items-center gap-2 md:gap-4">

            <div className="h-6 w-px bg-gray-200 hidden sm:block mx-2"></div>

            <Link 
              to="/login" 
              className="px-5 py-2.5 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-all text-sm"
            >
              Masuk
            </Link>

            <Link 
              to="/vendor-register" 
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 text-sm active:scale-95"
            >
              Daftar Vendor
            </Link>
          </div>
        </div>
      </nav>

      {/* SECTION FILTER: Hero Area */}
      <div className="bg-blue-600 py-16 px-4 rounded-b-[3rem] shadow-xl">
        <div className="max-w-4xl mx-auto text-center text-white mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Temukan Vendor Terbaik</h1>
          <p className="opacity-80 text-lg">Pilih jenis acara dan layanan yang kamu butuhkan untuk event impianmu.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4">
          {/* Filter Kategori */}
          <div className="flex-1 px-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Pilih Acara</label>
            <select 
              className="w-full border-none focus:ring-0 font-bold text-gray-700 bg-transparent cursor-pointer"
              value={filters.category_id}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">Semua Event</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="w-px bg-gray-100 hidden md:block"></div>

          {/* Filter Tipe Layanan */}
          <div className="flex-1 px-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Cari Layanan</label>
            <select 
              className="w-full border-none focus:ring-0 font-bold text-gray-700 bg-transparent cursor-pointer"
              value={filters.service_type_id}
              onChange={(e) => setFilters({...filters, service_type_id: e.target.value})}
              disabled={!filters.category_id}
            >
              <option value="">Semua Layanan</option>
              {serviceTypes.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Tombol Cari */}
          <button 
            onClick={fetchServices}
            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-orange-200 uppercase text-xs tracking-widest"
          >
            Cari Jasa
          </button>
        </div>
      </div>

      {/* GRID KATALOG JASA */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-400 font-medium tracking-wide">Mencari vendor spesial untukmu...</p>
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map(item => (
              <div 
                key={item.id} 
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Image & Category Tag */}
                <div className="relative overflow-hidden h-64 cursor-pointer" onClick={() => navigate(`/service/${item.id}`)}>
                  <img 
                    src={item.portfolio_urls?.[0] || 'https://via.placeholder.com/400x300'} 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.name}
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                      {item.category?.name || 'Event'}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  {/* Service Type Tag */}
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] block mb-2">
                    {item.service_type?.name || 'Layanan'}
                  </span>
                  
                  <h3 
                    className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors leading-tight"
                    onClick={() => navigate(`/service/${item.id}`)}
                  >
                    {item.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mt-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="mt-8 flex justify-between items-center border-t border-gray-50 pt-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mulai Dari</span>
                      <span className="text-xl font-black text-gray-900 mt-1">
                        Rp {Number(item.price).toLocaleString('id-ID')}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/service/${item.id}`)}
                      className="bg-gray-900 hover:bg-blue-600 text-white px-7 py-3 rounded-2xl text-xs font-black transition-all active:scale-95 shadow-md uppercase tracking-wider"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-200">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
               <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-bold">Yah, Belum Ada Hasil.</p>
            <p className="text-gray-400 text-sm mt-2">Coba gunakan filter kategori atau layanan yang lain.</p>
          </div>
        )}
      </div>
    </div>
  );
}