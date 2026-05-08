import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';

export default function EditService() {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    event_category_id: '',
    images: [] 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // 1. Ambil data kategori untuk dropdown
        const catRes = await axios.get('/categories');
        setCategories(catRes.data.data || []);

        // 2. Ambil data lama jasa ini
        const serviceRes = await axios.get(`/vendor/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const oldData = serviceRes.data.data;
        
        // Isi form dengan data lama
        setFormData({
          name: oldData.name,
          description: oldData.description,
          price: oldData.price,
          event_category_id: oldData.event_category_id,
          images: [] // Biarkan kosong, isi jika vendor mau ganti foto
        });

        if (oldData.event_category_id) {
            const typeRes = await axios.get(`/categories/${oldData.event_category_id}/service-types`);
            setServiceTypes(typeRes.data.data || []);
            
            setFormData(prev => ({
                ...prev,
                service_type_id: oldData.service_type_id // Pastikan BE mengirimkan ini
            }));
        }
        // Tampilkan preview foto lama
        setPreviews(oldData.portfolio_urls || []);
        
      } catch (err) {
        console.error("Gagal load data:", err);
        alert("Data tidak ditemukan");
        navigate('/dashboard-vendor');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('event_category_id', formData.event_category_id);
    data.append('service_type_id', formData.service_type_id);
    
    // Trik Laravel: Gunakan POST tapi selipkan _method PUT untuk update file
    data.append('_method', 'PUT');

    if (formData.images.length > 0) {
      formData.images.forEach((file) => {
        data.append('images[]', file);
      });
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`/vendor/services/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert('Jasa berhasil diperbarui!');
      navigate('/dashboard-vendor');
    } catch (err) {
      console.error("Update error:", err.response?.data);
      alert('Gagal mengupdate data.');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading data jasa...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Edit Jasa</h2>
          <p className="text-gray-500">Perbarui informasi jasa layananmu.</p>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
            <select 
              className="w-full px-4 py-3 border rounded-xl"
              value={formData.event_category_id}
              onChange={(e) => setFormData({...formData, event_category_id: e.target.value})}
              required
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Jasa</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border rounded-xl" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Harga (Rp)</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 border rounded-xl" 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi</label>
            <textarea 
              className="w-full px-4 py-3 border rounded-xl" 
              rows="5" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Ganti Portofolio (Opsional)</label>
            <input type="file" multiple onChange={handleFileChange} className="mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {previews.map((src, index) => (
                <img key={index} src={src} className="h-20 w-full object-cover rounded-lg border" alt="preview" />
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700">
              Simpan Perubahan
            </button>
            <button type="button" onClick={() => navigate('/dashboard-vendor')} className="px-8 py-4 border rounded-2xl">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}