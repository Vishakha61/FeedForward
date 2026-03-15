import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  return (
    <div style={{display:"flex", justifyContent:"center", marginTop:"100px"}}>
      <form onSubmit={handleSubmit} style={{width:"300px"}}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{width:"100%", padding:"10px", marginBottom:"10px"}}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{width:"100%", padding:"10px", marginBottom:"10px"}}
        />

        <button type="submit" style={{width:"100%", padding:"10px"}}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;