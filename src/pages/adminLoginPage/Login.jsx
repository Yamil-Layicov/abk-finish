import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login.scss";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loginUser = async () => {
    try {
      const response = await axios.post("https://api.nane.az/api/login", formData);
      setUser(response.data.token);
      navigate("/admin");
    } catch (error) {
      alert("Giriş uğursuz oldu. E-poçt və parolunuzu yoxlayın");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Giriş uğursuz oldu. E-poçt və parolunuzu yoxlayın");
      return;
    }

    setError("");
    loginUser();
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <h3>Admin Panel</h3>
        {error && <div className="error">{error}</div>}
        <label htmlFor="email">E-poçt</label>
        <input
          type="email"
          name="email"
          placeholder="e-poçt"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Parol</label>
        <input
          type="password"
          name="password"
          placeholder="parol"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Daxil ol</button>
      </form>
    </div>
  );
};

export default Login;
