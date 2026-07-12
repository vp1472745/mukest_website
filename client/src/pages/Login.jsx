import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import { Camera, Lock, Mail, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect
    const token = localStorage.getItem('lenscraft_admin_token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await api.auth.login(email, password);
      toast.success('Access Granted! Welcome to LensCraft Admin Console.');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || 'Authentication Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-dark flex flex-col justify-center items-center px-6">
      {/* Aesthetic Background Overlays */}
      <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920')` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/90 to-transparent" />

      <div className="relative z-10 w-full max-w-md bg-[#161616]/95 border border-white/5 p-8 md:p-10 shadow-2xl backdrop-blur-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Camera className="w-6 h-6 text-accent" />
            <span className="font-display text-xl md:text-2xl font-semibold tracking-wider text-white">
              LENSCRAFT<span className="text-accent">.</span>
            </span>
          </div>
          <h2 className="font-display text-2xl text-white font-light tracking-wide mt-2">
            Administrator Portal
          </h2>
          <p className="text-white/40 text-xs mt-1">
            Access secure website configuration tools.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark/65 border border-white/10 text-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors duration-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block">
              Secure Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark/65 border border-white/10 text-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors duration-200"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover disabled:bg-accent/40 text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Authorize Entrance</span>
            )}
          </button>
        </form>

        {/* Hint Box */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/30 text-[10px] tracking-wider leading-relaxed">
            Default credentials: <strong className="text-accent">admin@gmail.com</strong> / <strong className="text-accent">Admin@123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
