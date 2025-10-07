import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResetPasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [stage, setStage] = useState("email");
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, stLoading] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
};

export default ResetPasswordModal;
