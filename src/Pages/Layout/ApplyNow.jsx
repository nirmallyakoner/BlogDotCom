import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ApplyNow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apply, setApply] = useState();
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const mobile = localStorage.getItem("mobile");
  const [user, setUser] = useState({
    name: name,
    email: email,
    phone: mobile,
    city: "",
    address: "",
    qualification: "",
    programing_knowledge: "",
    experiance: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (apply?.message === "you apply course Successfully") {
      toast(apply?.message);
      navigate("/course");
    }
  }, [apply]);

  const handleSubmit = async (id) => {
    id.e.preventDefault();
    const res = await axios.post(
      `https://restapinodejs.onrender.com/api/course/apply/${id.id}`,
      user
    );
    const resData = res?.data;
    setApply(resData);
    console.log(apply);
    if (apply?.message === "you apply course Successfully") {
      toast(apply?.message);
      navigate("/course");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "0px",
          padding: "100px",
        }}
      >
        <form
          className="my-5 py-5 w-50 mx "
          style={{
            border: "1px solid black",
            padding: "30px",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        >
          <p style={{ color: "red" }}> *All Fields Are Strictly Required</p>
          <div class="form-group ">
            <label for="exampleInputPassword1"> Name</label>

            <input
              type="text"
              name="name"
              class="form-control"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>

            <input
              type="email"
              name="email"
              value={user.email}
              class="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Phone Number</label>

            <input
              type="text"
              name="phone"
              class="form-control"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Your City</label>

            <input
              type="text"
              name="city"
              class="form-control"
              value={user.city}
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Your Address</label>

            <input
              type="text"
              name="address"
              value={user.address}
              class="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Your Qualification</label>

            <input
              type="text"
              name="qualification"
              value={user.qualification}
              class="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Programing Knowledge</label>

            <input
              type="text"
              name="programing_knowledge"
              value={user.programing_knowledge}
              class="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Your experiance</label>

            <input
              type="text"
              name="experiance"
              value={user.experiance}
              class="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={(e) => {
              handleSubmit({ e: e, id: id });
            }}
          >
            Apply Now
          </button>
        </form>
        <img
          src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          style={{
            height: "863px",
            marginTop: "48px",
            width: "700px",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        />
      </div>
    </div>
  );
}
