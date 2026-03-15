import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("restaurant");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <div style={{display:"flex", justifyContent:"center", marginTop:"100px"}}>
      <form onSubmit={handleSubmit} style={{width:"300px"}}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{width:"100%", padding:"10px", marginBottom:"10px"}}
        />

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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{width:"100%", padding:"10px", marginBottom:"10px"}}
        >
          <option value="restaurant">Restaurant</option>
          <option value="ngo">NGO / Volunteer</option>
        </select>

        <button type="submit" style={{width:"100%", padding:"10px"}}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;