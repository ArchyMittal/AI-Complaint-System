import { useEffect, useState } from "react";

import axios from "axios";



function Dashboard() {

  const token = localStorage.getItem(
    "token"
  );



  const [formData, setFormData] = useState({

    name: "",

    email: "",

    title: "",

    description: "",

    category: "",

    location: ""

  });



  const [complaints, setComplaints] =
    useState([]);

  const [aiResult, setAiResult] =
    useState("");



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };



  const fetchComplaints = async () => {

    try {

      const response = await axios.get(

        "https://ai-complaint-system-5lx1.onrender.com/api/complaints",

        {
          headers: {
            Authorization: token
          }
        }

      );



      setComplaints(response.data);

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {

    fetchComplaints();

  }, []);





  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        "https://ai-complaint-system-5lx1.onrender.com/api/complaints",

        formData,

        {
          headers: {
            Authorization: token
          }
        }

      );



      const aiResponse = await axios.post(

        "https://ai-complaint-system-5lx1.onrender.com/api/ai/analyze",

        {
          description:
            formData.description
        }

      );



      setAiResult(

        aiResponse.data
        .choices[0]
        .message
        .content

      );



      alert("Complaint Submitted");



      fetchComplaints();

    } catch (error) {

      console.log(error);

      alert("Error");

    }

  };


  const deleteComplaint = async (id) => {

    try {

      await axios.delete(

        `https://ai-complaint-system-5lx1.onrender.com/api/complaints/${id}`,

        {
          headers: {
            Authorization: token
          }
        }

      );



      fetchComplaints();

    } catch (error) {

      console.log(error);

    }

  };


  const updateStatus = async (id) => {

    try {

      await axios.put(

        `https://ai-complaint-system-5lx1.onrender.com/api/complaints/${id}`,

        {
          status: "Resolved"
        },

        {
          headers: {
            Authorization: token
          }
        }

      );



      fetchComplaints();

    } catch (error) {

      console.log(error);

    }

  };



  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };



  return (

    <div
      style={{
        width: "90%",
        margin: "auto",
        padding: "20px",
        color: "white"
      }}
    >

      <button
        onClick={logout}
        style={{
          width: "150px",
          float: "right"
        }}
      >
        Logout
      </button>



      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        Complaint Dashboard
      </h1>



      <div className="card">

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
            type="text"
            name="title"
            placeholder="Complaint Title"
            onChange={handleChange}
          />



          <textarea
            rows="5"
            name="description"
            placeholder="Complaint Description"
            onChange={handleChange}
          ></textarea>



          <select
            name="category"
            onChange={handleChange}
          >

            <option>
              Select Category
            </option>

            <option>
              Water
            </option>

            <option>
              Electricity
            </option>

            <option>
              Garbage
            </option>

            <option>
              Road Damage
            </option>

          </select>



          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />



          <button type="submit">
            Submit Complaint
          </button>

        </form>

      </div>



      {
        aiResult && (

          <div className="card">

            <h2>
              AI Analysis
            </h2>

            <pre>
              {aiResult}
            </pre>

          </div>

        )
      }



      <div className="card">

        <h2>
          All Complaints
        </h2>



        {
          complaints.map((item) => (

            <div
              key={item._id}
              style={{
                marginTop: "20px",
                padding: "10px",
                borderBottom:
                  "1px solid gray"
              }}
            >

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

              <p>
                Category:
                {" "}
                {item.category}
              </p>

              <p>
                Location:
                {" "}
                {item.location}
              </p>

              <p>
                Status:
                {" "}
                {item.status}
              </p>



              <button
                onClick={() =>
                  updateStatus(item._id)
                }
              >
                Mark Resolved
              </button>



              <button
                onClick={() =>
                  deleteComplaint(item._id)
                }
                style={{
                  background: "red",
                  marginTop: "10px"
                }}
              >
                Delete
              </button>

            </div>

          ))
        }

      </div>

    </div>

  );

}



export default Dashboard;