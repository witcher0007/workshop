import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const handleInputChange = (event) => {
    setRegisterData({ ...registerData, [event.target.name]: event.target.value });
  };

  const handleRegister = () => {
    // Perform registration logic here
    console.log(registerData);
    // Reset the form
    setRegisterData({ name: "", email: "", password: "" });
    // Redirect to App component
    navigate("/app");
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form>
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={registerData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
