import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axios';

export default function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login/vendor', {
        email,
        password,
      });

      const { token, user } = response.data.data;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        alert(`Selamat datang, ${user.name}!`);

        navigate('/dashboard-vendor');
      }
    } catch (err) {
      console.error(err);

      alert(
        'Login Vendor Gagal: ' +
          (err.response?.data?.message || 'Akses ditolak')
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-slate-950 via-blue-950 to-indigo-900 items-center justify-center p-12">

        <div className="max-w-lg">

          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-300 text-sm">
            Vendor Dashboard Portal
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight">
            Kelola Bisnis Event
            <span className="block text-blue-400">
              Lebih Mudah
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Masuk ke dashboard vendor Evoria untuk mengelola layanan,
            menerima booking customer, dan meningkatkan bisnis event organizer kamu.
          </p>

          <div className="mt-10 space-y-4">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              📦 Kelola layanan & katalog vendor
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              📅 Pantau booking customer secara realtime
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              💰 Tingkatkan penjualan & exposure bisnis
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
              Vendor Login
            </h2>

            <p className="mt-2 text-gray-400">
              Masuk ke dashboard vendor Evoria
            </p>
          </div>

          {/* FORM */}
          <form
            className="mt-8 space-y-5"
            onSubmit={handleLogin}
          >

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-500 shadow-lg shadow-blue-900/40"
            >
              Login ke Dashboard
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Belum punya akun vendor?
            </p>

            <Link
              to="/vendor-register"
              className="mt-2 inline-block text-blue-400 font-semibold hover:text-blue-300 transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}   