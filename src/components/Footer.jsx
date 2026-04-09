import { Link } from "react-router-dom";
import { FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-black text-white">ByteMeal</h1>
            <p className="text-sm">
              © {new Date().getFullYear()} ByteMeal Developed as a portfolio
              project. Not affiliated with actual Swiggy.
            </p>
            <p className="text-sm">Made with ❤️ by Krishna</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/krishansingh__"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-pink-500"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://github.com/krishansingh7"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <FaGithub size={22} />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-white">Company</h2>
            <p className="cursor-pointer transition hover:text-white">About</p>
            <p className="cursor-pointer transition hover:text-white">
              Careers
            </p>
            <p className="cursor-pointer transition hover:text-white">Team</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-white">Contact us</h2>
            <Link
              to="/contact"
              className="cursor-pointer transition hover:text-white"
            >
              Help & Support
            </Link>
            <Link
              to="/contact"
              className="cursor-pointer transition hover:text-white"
            >
              Partner with us
            </Link>
            <p className="cursor-pointer transition hover:text-white">
              Ride with us
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-white">Legal</h2>
            <p className="cursor-pointer transition hover:text-white">
              Terms & Conditions
            </p>
            <p className="cursor-pointer transition hover:text-white">
              Cookie Policy
            </p>
            <p className="cursor-pointer transition hover:text-white">
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
