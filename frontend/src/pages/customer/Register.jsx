import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'customer',
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/register', formData);

      alert('Registrasi berhasil! Silakan login.');

      navigate('/login');
    } catch (err) {
      console.error(err);

      alert(
        'Registrasi Gagal: ' +
          (err.response?.data?.message || 'Data tidak valid')
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-r from-blue-600 to-indigo-700 items-center justify-center p-12">
        <div className="max-w-md text-white">

          <h1 className="text-5xl font-bold leading-tight">
            Join Evoria
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Daftar sekarang dan temukan berbagai vendor terbaik
            untuk wedding, birthday, wisuda, dan acara spesial lainnya.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              🎉 Ribuan layanan event tersedia
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              💍 Vendor terpercaya & profesional
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              ✨ Booking mudah & cepat
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-10">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Buat akun Evoria baru
            </p>
          </div>

          {/* FORM */}
          <form
            className="mt-8 space-y-5"
            onSubmit={handleRegister}
          >

            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
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
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Masukkan email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
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
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD CONFIRM */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-semibold text-gray-700"
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
                    password_confirmation: e.target.value,
                  })
                }
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition duration-300 shadow-lg"
            >
              Daftar Sekarang
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?
            </p>

            <Link
              to="/login"
              className="inline-block mt-2 text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Login di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}