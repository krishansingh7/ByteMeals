import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out',error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
      </div>

      <div className="rounded-lg border border-gray-100 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-sm">
        <div className="mb-8 flex items-center space-x-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10 text-3xl font-bold text-orange-600 dark:text-orange-500 shadow-sm overflow-hidden border border-orange-200 dark:border-orange-500/20">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : user?.displayName ? (
              user.displayName[0].toUpperCase()
            ) : (
              "U"
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {user?.displayName || "App User"}
            </h2>
            <p className="font-medium text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-100 dark:border-slate-800 pt-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200">Account Settings</h3>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/orders"
              className="flex items-center justify-center rounded-md border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-6 py-2.5 font-bold text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              View Past Orders
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-md border-2 border-orange-500 dark:border-orange-500/80 px-6 py-2.5 font-bold text-orange-500 dark:text-orange-400 transition hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
