import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axios';

export default function VendorRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    business_name: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/register/vendor', formData);

      alert(
        'Registrasi berhasil! Silakan login dengan akun vendor kamu.'
      );

      navigate('/vendor-login');
    } catch (err) {
      console.error(err);

      alert(
        'Registrasi Gagal: ' +
          (err.response?.data?.message ||
            'Cek kembali data kamu')
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-slate-950 via-blue-950 to-indigo-900 items-center justify-center p-12">

        <div className="max-w-lg">

          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-300 text-sm">
            Join Vendor Partnership
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight">
            Bangun Bisnis Event
            <span className="block text-blue-400">
              Bersama Evoria
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Daftarkan bisnis event organizer kamu dan mulai
            menjangkau lebih banyak customer untuk wedding,
            birthday party, wisuda, dan berbagai acara spesial lainnya.
          </p>

          <div className="mt-10 space-y-4">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              🚀 Tingkatkan exposure bisnis vendor
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              📦 Upload & kelola layanan dengan mudah
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              💰 Dapatkan customer & booking baru
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 bg-gray-950">

        <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

          {/* HEADER */}
          <div className="text-center">

            <div className="w-18 h-18 mx-auto rounded-2xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center text-3xl">
              🏢
            </div>

            <h2 className="mt-5 text-4xl font-bold">
              Vendor Register
            </h2>

            <p className="mt-2 text-gray-400">
              Buat akun vendor Evoria
            </p>
          </div>

          {/* FORM */}
          <form
            className="mt-8 space-y-5"
            onSubmit={handleRegister}
          >

            {/* NAMA */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Nama Lengkap
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Bisnis
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Masukkan email bisnis"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* BUSINESS NAME */}
            <div>
              <label
                htmlFor="business_name"
                className="block text-sm font-medium text-gray-300"
              >
                Nama Bisnis
              </label>

              <input
                id="business_name"
                name="business_name"
                type="text"
                required
                placeholder="Contoh: Evoria Decoration"
                value={formData.business_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    business_name: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300"
              >
                Alamat Bisnis
              </label>

              <textarea
                id="address"
                name="address"
                rows="3"
                placeholder="Masukkan alamat bisnis"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Masukkan password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* PASSWORD CONFIRMATION */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-300"
              >
                Konfirmasi Password
              </label>

              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                placeholder="Ulangi password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation:
                      e.target.value,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-500 shadow-lg shadow-blue-900/40"
            >
              Daftar Vendor
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Sudah punya akun vendor?
            </p>

            <Link
              to="/vendor-login"
              className="mt-2 inline-block text-blue-400 font-semibold hover:text-blue-300 transition"
            >
              Login di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}