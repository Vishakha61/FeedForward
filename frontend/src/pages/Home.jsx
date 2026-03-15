import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>FeedForward</h1>
      <h3>Food Waste Redistribution Platform</h3>

      <p style={{ width: "60%", margin: "20px auto" }}>
        FeedForward connects restaurants with NGOs and volunteers to redistribute
        leftover food to people in need. Our goal is to reduce food waste and help
        fight hunger in communities.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button style={{ padding: "10px 20px", marginRight: "10px" }}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button style={{ padding: "10px 20px" }}>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;