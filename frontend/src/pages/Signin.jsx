import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';  // ✅ Fix hook import

function Signin() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();  // ✅ Ensure correct function call

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // ✅ State for error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Clear previous errors

    try {
   
      const res = await fetch('${process.env.REACT_APP_BACKEND_URL}/api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setToken(data.token);
        navigate("/Todo");
      } else {
        setError(data.error);  // ✅ Show error message
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="bg-[url('./assets/ToDoBg10.jpg')] bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col border-2 bg-gray-200 rounded-2xl border-gray-400 w-[600px] h-96 p-10">
        <h1 className="text-center mb-5 font-extrabold text-3xl">Welcome Back!</h1>
        
        {error && <p className="text-red-500 text-center">{error}</p>}  {/* ✅ Show error message */}
        
        <form onSubmit={handleSubmit} className="flex flex-col">
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

          <button type="submit" className="p-2 bg-purple-500 rounded-2xl mb-5 border-2 border-gray-400 text-white text-xl">
            Login
          </button>

          <a href="/signup" className="text-purple-700 hover:underline">
            Don't have an account? Sign up
          </a>
        </form>
      </div>
    </div>
  );
}

export default Signin;
