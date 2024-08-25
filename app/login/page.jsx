"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
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
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessPopup(true);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setUsernameError(data.message);
        setPasswordError(data.message);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      setFormError(error.message || "Gagal melakukan pendaftaran. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    let error = "";
    let passwordError = "";
    let usernameError = "";

    //cek validasi password

    return { usernameError: error, passwordError };
  };

  return (
    <section className="w-full h-full max-h-[100vh]">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="w-full max-w-[400px] bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-600 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-600 text-sm font-bold mb-2">Username</label>
                <input
                  name="username"
                  className={`w-full px-3 py-2 text-white bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${usernameError ? "border-red-500" : "border-gray-300"}`}
                  type="text"
                  placeholder="username kamu"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  name="password"
                  className="w-full px-3 py-2 text-white bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  type={showPassword ? "text" : "password"}
                  placeholder="password kamu"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && <p className="text-red-500 text-sm ml-1 mt-1">{passwordError}</p>}
              </div>
              <div className="flex items-center space-x-2 mb-3 ml-1">
                <Checkbox id="show" onCheckedChange={(checked) => setShowPassword(checked)} checked={showPassword} />
                <label htmlFor="show" className="text-sm font-medium text-gray-600 leading-none">
                  Lihat password
                </label>
              </div>
              <button type="submit" className="w-full mt-3 bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent">
                Login
              </button>
              <div className="text-gray-600 text-center mt-2 text-sm font-semibold">
                <p>
                  Belum punya akun?{" "}
                  <a href="/registrasi" className="text-sky-600">
                    Daftar Sekarang
                  </a>
                </p>
              </div>
            </form>
            {showSuccessPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg text-center font-semibold text-green-600">Login Berhasil!</h3>
                  <p className="mt-2 text-gray-600 text-center">Selamat Berbelanja 💰</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
