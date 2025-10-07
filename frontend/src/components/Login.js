import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./context/AuthProvider";
import LoginButton from "./LoginButton";
import ChangePasswordModal from "./ChangePasswordModal";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const API_BASE_URL =
        window.location.hostname === "localhost"
          ? "http://127.0.0.1:8000"
          : "https://pcp-backend-f4a2.onrender.com";

      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);

      setUser({
        username: response.data.username,
        password: response.data.password,
        token: response.data.access,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error: ", err);
      setError("Invalid email or password. Please try again.");

      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      setUser(null);
    }
  };

  const goToAddUser = () => {
    navigate("/adduser");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePasswordUpdate = ({ email }) => {
    setError("Password updated successfully. Please log in.");
    setTimeout(() => setError(""), 3000);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginContent}>
          <header className={styles.branding}>
            <h1>Project Collaboration Portal</h1>
            <p>Your collaboration workspace</p>
          </header>

          <section className={styles.welcome}>
            <h2>Welcome back</h2>
            <p>Sign in to your collaboration workspace</p>
          </section>

          <form
            id="loginForm"
            className={styles.loginForm}
            onSubmit={handleSubmit}
          >
            <div className={styles.formGroup}>
              <label htmlFor="email">Email address</label>
              <div className={styles.inputContainer}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.inputIcon}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputContainer}>
                <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  aria-label="Toggle password visibility"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className={styles.formOptions}>
              <label className={styles.remeberMe}></label>
              <button
                type="button"
                className={styles.forgotPassword}
                onClick={openModal}
              >
                forgotPassword?
              </button>
            </div>
            <LoginButton>Login</LoginButton>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <div className={styles.signupLink}>
            <p>
              Don't have an account?
              <button
                type="button"
                className={styles.signupButton}
                onClick={goToAddUser}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onPasswordUpdate={handlePasswordUpdate}
      />

      {error && (
        <div id="toast" className={styles.toast}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;
