import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Check_Token } from "../../Redux/Authslice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  let toggle = useSelector((state) => state.Auth);
  let [error, setError] = useState("");
  const validation = () => {
    let error = {};

    if (!user.email) {
      error.email = "Email Is Important";
    }
    if (!user.password) {
      error.password = "Password Is Important";
    }
    return error;
  };
  let name, value;
  const navigate = useNavigate();

  const [register, setRegister] = useState("");

  const handleChange = (e) => {

    name = e.target.name;
    value = e.target.value;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validation());
    const formData = {
      email: user.email,
      password: user.password,
    };

    try {
      const response = await axios.post(
        "https://restapinodejs.onrender.com/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast(response?.data?.message);
      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("name", user?.name);
        localStorage.setItem("email", user?.email);
        localStorage.setItem("mobile", user?.mobile);
        dispatch(Check_Token());
        navigate("/bloglist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "0px",
        padding: "100px",
      }}
    >
      {" "}
      <form
        className="w-50 my-5  py-5 "
        style={{
          height: "500px",
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
          Login Here
        </h1>
        <div class="form-group  ">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
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
            onChange={handleChange}
            class="form-control"
            id="exampleInputPassword1"
          />
          <span style={{ color: "red" }}>{error.password}</span>
        </div>

        <button type="submit" onClick={handleSubmit} class="btn btn-primary">
          LogIn
        </button>

        <div>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "green" }}
          >
            <span>Not Registered? </span> Click Here To Register
          </Link>
        </div>
      </form>
      <img
        src="https://images.pexels.com/photos/1144266/pexels-photo-1144266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        style={{
          height: "500px",
          marginTop: "48px",
          width: "700px",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      />
    </div>
  );
}
