"use client";

import React, { useState } from "react";

const Registrasi = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowPassword(event.target.checked);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  //vaalidasi form
  const validateForm = () => {
    let error = "";
    let passwordError = "";

    //cek validasi username
    if (username.length < 5) {
      error = "Username minimal 5 karakter.";
    } else if (username.length > 40) {
      error = "Username maksimal 40 karakter.";
    } else if (/\s/.test(username)) {
      error = "Username tidak boleh mengandung spasi.";
    }

    //cek validasi password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,50}$/;
    if (!passwordPattern.test(password)) {
      passwordError = "Password harus mengandung angka, huruf kecil, dan huruf kapital !";
    } else if (password !== confirmPassword) {
      passwordError = "Password kamu tidak cocok.";
    } else if (password.length < 5) {
      passwordError = "Password minimal 5 karakter.";
    } else if (password.length > 50) {
      passwordError = "Password maksimal 50 karakter.";
    }

    return { usernameError: error, passwordError };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { usernameError, passwordError } = validateForm();

    if (usernameError || passwordError) {
      setUsernameError(usernameError);
      setPasswordError(passwordError);
    } else {
      setUsernameError("");
      setPasswordError("");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="w-full h-full">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="w-full max-w-[400px] bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-600 text-center">Daftar Akun</h2>
            <form onSubmit={handleSubmit} className="bg-sky-100 p-5 rounded-md">
              <div className="mb-3">
                <label className="block text-gray-600 text-sm font-bold mb-2">Username</label>
                <input
                  className={`w-full px-3 py-2 text-white bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${usernameError ? "border-red-500" : "border-gray-300"}`}
                  type="text"
                  placeholder="username kamu"
                  value={username}
                  onChange={handleUsernameChange}
                />
                {usernameError && <p className="text-red-500 text-sm ml-1 mt-1">{usernameError}</p>}
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input className="w-full px-3 py-2 text-white bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" type="email" placeholder="email kamu" />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  className="w-full px-3 py-2 text-white bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  type={showPassword ? "text" : "password"}
                  placeholder="password kamu"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && <p className="text-red-500 text-sm ml-1 mt-1">{passwordError}</p>}
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">Konfirmasi Password</label>
                <input
                  className="w-full px-3 py-2 text-white bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  type={showPassword ? "text" : "password"}
                  placeholder="ulangi password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {passwordError && <p className="text-red-500 text-sm ml-1 mt-1">{passwordError}</p>}
              </div>
              <div className="flex items-center space-x-2 mb-3 ml-1">
                <input type="checkbox" id="show" onChange={handleCheckboxChange} checked={showPassword} />
                <label htmlFor="show" className="text-sm font-medium text-gray-600 leading-none">
                  Lihat password
                </label>
              </div>
              <div className="text-gray-600 font-italic text-[12px] md:text-[15px] font-semibold">
                <p>
                  <i>*Password harus mengandung angka, huruf kecil, dan huruf kapital !</i>
                </p>
              </div>
              <button type="submit" className="w-full mt-3 bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent">
                Daftar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registrasi;
