import React from "react";

const login = () => {
  return (
    <div className="flex bg-daybook-primary items-center justify-center h-screen">
      <div>
        <img src="/assets/logo.svg" alt="daybook-logo" className="w-96" />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-title mb-4">Welcome Back!</h1>
        <p className="text-lg text-muted mb-8">
          Please log in to your account to continue.
        </p>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
