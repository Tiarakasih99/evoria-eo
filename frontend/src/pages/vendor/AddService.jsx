import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

export default function AddService() {
  const [categories, setCategories] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    event_category_id: '', // Sesuai validasi di VendorServiceController
    service_type_id: '', // Tambahkan ini
    images: [] // Untuk menyimpan array file foto
  });
  
  const navigate = useNavigate();

  // 1. Ambil data kategori dari Backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        // Mengakses response.data.data karena struktur JSON BE kita: { status: 'success', data: [...] }
        setCategories(response.data.data || []);
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      }
    };
    fetchCategories();
  }, []);

  // 2. Handle perubahan file foto
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Buat preview URL agar vendor bisa melihat foto sebelum upload
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };


  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, event_category_id: categoryId, service_type_id: '' }); // Reset tipe saat kategori ganti
  
    if (categoryId) {
      setLoadingTypes(true);
      try {
        const response = await axios.get(`/categories/${categoryId}/service-types`);
        setServiceTypes(response.data.data || []);
      } catch (err) {
        console.error("Gagal memuat tipe layanan:", err);
      } finally {
        setLoadingTypes(false);
      }
    } else {
      setServiceTypes([]);
    }
  };
  // 3. Submit Data ke Laravel
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Gunakan FormData untuk mengirim file
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('event_category_id', formData.event_category_id);
    data.append('service_type_id', formData.service_type_id); // Tambahkan ini
    
    // Append multiple images sebagai array images[]
    formData.images.forEach((file) => {
      data.append('images[]', file); 
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post('/vendor/services', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Wajib untuk Auth::id() di Backend
        }
      });
      
      alert('Jasa berhasil ditambahkan ke katalog Evoria!');
      navigate('/dashboard-vendor');
    } catch (err) {
      console.error("Error Detail:", err.response?.data);
      alert('Gagal: ' + (err.response?.data?.message || 'Cek kembali koneksi dan inputanmu'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        <header className="mb-8 border-b pb-4">
          <h2 className="text-3xl font-extrabold text-gray-800">Posting Jasa Baru</h2>
          <p className="text-gray-500">Tampilkan portofolio terbaikmu untuk menarik pelanggan.</p>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pilihan Kategori
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Event</label>
            <select 
              className="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={formData.event_category_id}
              onChange={(e) => setFormData({...formData, event_category_id: e.target.value})}
              required
            >
              <option value="">-- Pilih Kategori (Wedding, Wisuda, dsb) --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div> */}


          {/* Dropdown Kategori (Ubah onChange-nya) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Event</label>
            <select 
              className="w-full px-4 py-3 border rounded-xl"
              value={formData.event_category_id}
              onChange={handleCategoryChange} // Pakai fungsi baru kita
              required
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Dropdown Tipe Layanan (Baru) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tipe Layanan</label>
            <select 
              className="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
              value={formData.service_type_id}
              onChange={(e) => setFormData({...formData, service_type_id: e.target.value})}
              disabled={!formData.event_category_id || loadingTypes}
              required
            >
              <option value="">{loadingTypes ? 'Memuat...' : '-- Pilih Tipe (MUA, Fotografer, dll) --'}</option>
              {serviceTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          {/* Nama Jasa */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Jasa / Paket</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Contoh: Dokumentasi Cinematic Wedding"
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          {/* Harga */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Harga Estimasi (Rp)</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Contoh: 2500000"
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
              required 
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi & Kelengkapan Paket</label>
            <textarea 
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              rows="5" 
              placeholder="Jelaskan detail fasilitas yang didapat customer..."
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              required
            ></textarea>
          </div>

          {/* Multiple Portfolio Images */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Upload Portofolio (Bisa pilih banyak)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition cursor-pointer relative">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange} 
                required 
              />
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm text-gray-600">Klik atau seret foto ke sini</p>
              </div>
            </div>
            
            {/* Grid Preview */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-6">
              {previews.map((src, index) => (
                <div key={index} className="relative h-20 w-full">
                  <img src={src} className="h-full w-full object-cover rounded-lg shadow-sm border border-gray-200" alt="preview" />
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              type="submit" 
              className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95"
            >
              Simpan & Terbitkan Jasa
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/dashboard-vendor')} 
              className="px-10 py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 font-medium transition"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}