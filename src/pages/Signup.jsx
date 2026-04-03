import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import toast from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (providerName) => {
    setLoading(true);
    const provider = providerName === 'Google' ? new GoogleAuthProvider() : new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success(`Account connected with ${providerName}!`);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error('Email already associated with a different provider.');
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4 my-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        
        <div className="flex justify-between items-center mb-2">
           <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
           <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="Signup Food" className="w-20 h-20 object-contain rounded-full border border-slate-100 p-1" />
        </div>
        
        <p className="mb-6 text-sm text-gray-600">
          or <Link to="/login" className="text-orange-500 font-bold hover:text-orange-600">login to your account</Link>
        </p>

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-4 outline-none focus:border-orange-500 font-medium text-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 p-4 outline-none focus:border-orange-500 font-medium text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password (Min 6 Characters)"
              className="w-full border border-gray-300 p-4 outline-none focus:border-orange-500 font-medium text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 p-4 font-bold text-white transition hover:bg-orange-600 disabled:bg-orange-300 tracking-wider shadow-sm mt-2"
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-8 relative">
           <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-200"></div>
           </div>
           <div className="relative flex justify-center text-sm">
             <span className="px-3 bg-white text-gray-400 font-medium">Or create account using</span>
           </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => handleOAuthLogin('Google')}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 border border-gray-300 bg-white p-3.5 font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 shadow-sm"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          
          <button
            onClick={() => handleOAuthLogin('GitHub')}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 border border-gray-300 bg-[#24292e] p-3.5 font-bold text-white transition hover:bg-[#1b1f23] disabled:opacity-50 shadow-sm"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            GitHub
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;
