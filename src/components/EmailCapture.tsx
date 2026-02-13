"use client";

export default function EmailCapture() {
  return (
    <div className="mt-12 p-6 bg-white rounded-xl shadow text-center max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">
        Stop Underpricing Your Work
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Get beginner-friendly freelance pricing tips weekly.
      </p>

      <form
        action="https://assets.mailerlite.com/jsonp/2111336/forms/179267959470949728/subscribe"
        method="post"
        target="_blank"
        className="flex flex-col gap-3"
      >
        <input
          type="email"
          name="fields[email]"
          placeholder="Enter your email"
          required
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input type="hidden" name="ml-submit" value="1" />
        <input type="hidden" name="anticsrf" value="true" />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Get Pricing Tips
        </button>
      </form>
    </div>
  );
}
