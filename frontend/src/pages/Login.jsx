import { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";



function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "https://ai-complaint-system-5lx1.onrender.com/api/auth/login",

        formData

      );



      localStorage.setItem(
        "token",
        response.data.token
      );



      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid Credentials");

    }

  };



  return (

    <div className="container">

      <div className="card">

        <h1 className="title">
          Login
        </h1>



        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />



          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />



          <button type="submit">
            Login
          </button>

        </form>



        <div className="link">

          <Link
            to="/signup"
            style={{ color: "white" }}
          >
            Create New Account
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;