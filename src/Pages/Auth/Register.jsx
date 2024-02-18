import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate= useNavigate()
  let [error, setError] = useState("");
  const validation = () => {
    let error = {};
    if (!user.name) {
      error.name = "First Name is Important";
    }
    if (!user.mobile) {
      error.mobile = "Last Name is Important";
    }
    if (!user.email) {
      error.email = "Email is Important";
    }
    if (!user.password) {
      error.password = "Password is Important";
    }

    return error;
  };
  const [register, setRegister] = useState();
  const fetchData = async (formData) => {
    let res = await axios.post(
      "https://restapinodejs.onrender.com/api/register",
      formData
    );
    setRegister(res?.data);
  };

  console.log(register);
  let name, value;
  const PostUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "name") {
      if (value.length === 0) {
        setUser({ ...user, name: "" });
        setError({ ...error, name: " Name Is Important" });
      } else {
        setUser({ ...user, name: value });
        setError({ ...error, name: "" });
      }
    }
    if (name === "mobile") {
      if (value.length === 0) {
        setUser({ ...user, mobile: "" });
        setError({ ...error, mobile: "Last Name Is Important" });
      } else {
        setUser({ ...user, mobile: value });
        setError({ ...error, mobile: "" });
      }
    }
    if (name === "email") {
      if (value.length === 0) {
        setUser({ ...user, email: "" });
        setError({ ...error, email: "Email Is Important" });
      } else {
        setUser({ ...user, email: value });
        setError({ ...error, email: "" });
      }
    }
    if (name === "password") {
      if (value.length === 0) {
        setUser({ ...user, password: "" });
        setError({ ...error, password: "Password Is Important" });
      } else {
        setUser({ ...user, password: value });
        setError({ ...error, password: "" });
      }
    }
  };
  const SubmitInfo = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("mobile", user.mobile);
    formData.append("password", user.password);
    fetchData(formData);
    toast(register?.message)
    if (register?.success == true) {
      navigate("/login")
    }
  };
  console.log(user);

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
          <h1
            style={{
              textAlign: "center",
              color: "green",
              fontFamily: "monospace",
              paddingBottom: "30px",
            }}
          >
            Register Here
          </h1>
          <div class="form-group ">
            <label for="exampleInputPassword1"> Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={PostUserData}
              class="form-control"
              id="exampleInputPassword1"
            />
            <span style={{ color: "red" }}>{error.name}</span>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={PostUserData}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <span style={{ color: "red" }}>{error.email}</span>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Mobile</label>
            <input
              type="email"
              name="mobile"
              value={user.mobile}
              onChange={PostUserData}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <span style={{ color: "red" }}>{error.email}</span>
            
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={PostUserData}
              class="form-control"
              id="exampleInputPassword1"
            />
            <span style={{ color: "red" }}>{error.password}</span>
          </div>

          <div>
            <button type="submit" onClick={SubmitInfo} class="btn btn-primary">
              Register
            </button>
          </div>
          <div>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "green" }}
            >
              <span>Already Registered? </span> Click Here To Login
            </Link>
          </div>
        </form>
        <img
          src="https://images.pexels.com/photos/2522671/pexels-photo-2522671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          style={{
            height: "614px",
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
