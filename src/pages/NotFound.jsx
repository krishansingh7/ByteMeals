import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-800">Page not found</h2>
      <p className="mt-2 text-gray-500">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="mt-8 rounded bg-orange-500 px-8 py-3 font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow"
      >
        GO BACK HOME
      </Link>
    </div>
  );
};

export default NotFound;
