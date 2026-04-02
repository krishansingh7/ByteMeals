import { useForm, ValidationError } from "@formspree/react";
import { Link } from "react-router-dom";
import { Mail, MessageSquare, User } from "lucide-react";

const Contact = () => {
  const [state, handleSubmit] = useForm("xykbdzrn");

  if (state.succeeded) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Mail size={36} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Message Sent!
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Thanks for reaching out! We'll get back to you soon.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Name */}
          <div className="mb-5">
            <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <User size={15} /> Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-orange-900"
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="mt-1 text-xs text-red-500"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Mail size={15} /> Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@example.com"
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-orange-900"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="mt-1 text-xs text-red-500"
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <MessageSquare size={15} /> Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Write your message here..."
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-orange-900 resize-none"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="mt-1 text-xs text-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full rounded-lg bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
          >
            {state.submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
