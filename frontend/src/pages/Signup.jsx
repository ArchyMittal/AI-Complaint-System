import { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";



function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

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

      await axios.post(

        "https://ai-complaint-system-5lx1.onrender.com/api/auth/signup",

        formData

      );



      alert("Signup Successful");

      navigate("/");

    } catch (error) {

      alert("Signup Failed");

    }

  };



  return (

    <div className="container">

      <div className="card">

        <h1 className="title">
          Signup
        </h1>



        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
          />



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
            Signup
          </button>

        </form>



        <div className="link">

          <Link
            to="/"
            style={{ color: "white" }}
          >
            Already Have Account?
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Signup;