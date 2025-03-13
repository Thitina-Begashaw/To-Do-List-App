import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

function Signup() {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState(null); // ✅ State to store error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
 

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setToken(data.token);
        navigate("/Todo");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="bg-[url('./assets/ToDoBg10.jpg')] bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col border-2 bg-gray-200 rounded-2xl border-gray-400 w-[600px] h-[500px] p-10">
        <h1 className="text-center mb-5 font-extrabold text-3xl">Create Account</h1>
        
        {error && <p className="text-red-500 text-center">{error}</p>} {/* ✅ Show error messages */}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            className="mb-5 border-2 p-2 rounded-2xl border-gray-400"
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            className="mb-5 border-2 p-2 rounded-2xl border-gray-400"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            className="mb-5 border-2 p-2 rounded-2xl border-gray-400"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            className="mb-5 border-2 p-2 rounded-2xl border-gray-400"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="p-2 bg-purple-500 rounded-2xl mb-5 border-2 border-gray-400 text-white text-xl"
          >
            Sign up
          </button>

          <a href="/signin" className="text-purple-700 hover:underline">
            Already have an account? Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default Signup;
