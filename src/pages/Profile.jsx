import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
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
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-8 flex items-center space-x-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-3xl font-bold text-orange-600 shadow-sm overflow-hidden">
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
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.displayName || "App User"}
            </h2>
            <p className="font-medium text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800">Account Settings</h3>
          <button
            onClick={handleLogout}
            className="rounded-md border-2 border-orange-500 px-6 py-2 font-bold text-orange-500 transition hover:bg-orange-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
