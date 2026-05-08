import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        email,
        password,
      });

      const { token, user } = response.data.data;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        alert(`Selamat datang, ${user.name}!`);

        // Redirect berdasarkan role
        if (user.role === 'vendor') {
          navigate('/dashboard-vendor');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error(err);
      alert(
        'Login Gagal: ' +
          (err.response?.data?.message || 'Periksa email & password')
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-r from-blue-600 to-indigo-700 items-center justify-center p-12">
        <div className="text-white max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to Evoria
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Temukan vendor terbaik untuk wedding, birthday party,
            wisuda, dan berbagai acara spesial lainnya.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              ✨ Vendor terpercaya
            </div>

            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              🎉 Event organizer modern
            </div>

            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              💍 Wedding & party services
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">

          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">
              Login
            </h2>

            <p className="text-gray-500 mt-2">
              Masuk ke akun Evoria kamu
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition duration-300 shadow-lg"
            >
              Masuk
            </button>
          </form>

          {/* REGISTER LINK */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum punya akun?
            </p>

            <Link
              to="/register"
              className="inline-block mt-2 text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}