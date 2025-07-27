import React from "react";

const SigninForm = ({ onSubmit }) => {
  return (
    <div className="w-full max-w-sm">
    <h1 className="text-2xl font-bold mb-6 text-center text-violet-600">Sign in</h1>
    <form onSubmit={onSubmit} className="flex flex-col space-y-4 x-4">
      <input
        name="identifier"
        placeholder="Email or Phone"
        required
        className="border rounded px-5 py-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="border rounded px-5 py-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
      >
        Login
      </button>
    </form>
    </div>
  );
};

export default SigninForm;
