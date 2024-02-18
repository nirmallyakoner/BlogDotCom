import axios from "axios";
import React, { useEffect, useState } from "react";
import OurTeam from "./OurTeam";
import Testimonial from "./Testimonial";
import { Link } from "react-router-dom";

export default function Home() {
  const [banner, setBanner] = useState();
  useEffect(() => {
    fetchBanner();
  }, []);
  const fetchBanner = async () => {
    let res = await axios.get("https://restapinodejs.onrender.com/api/banner");
    setBanner(res?.data);
  };
  const fetchphoto = (id) => {
    return `https://restapinodejs.onrender.com/api/banner/photo/${id}`;
  };

  return (
    <div>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src={`${fetchphoto(banner?.bannerdata[0]?._id)}`}
              class="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: 900 }}>
                <h1
                  className="text-white text-uppercase "
                  
                >
                  {" "}
                  Welcome To BLOGDOTCOM
                </h1>
                <h3 className="display-2 text-white text-uppercase mb-md-4"></h3>
                <Link
                  className="btn btn-primary py-md-3 px-md-5 me-3"
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login
                </Link>

                <Link
                  className="btn btn-primary py-md-3 px-md-5 me-3"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src={`${fetchphoto(banner?.bannerdata[1]?._id)}`}
              class="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: 900 }}>
                <h1 className="text-white text-uppercase">
                  {" "}
                  Welcome To BLOGDOTCOM
                </h1>
                <h3 className="display-2 text-white text-uppercase mb-md-4"></h3>
                <Link
                  className="btn btn-primary py-md-3 px-md-5 me-3"
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login
                </Link>

                <Link
                  className="btn btn-primary py-md-3 px-md-5 me-3"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src={`${fetchphoto(banner?.bannerdata[2]?._id)}`}
              class="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: 900 }}>
                <h1 className="text-white text-uppercase">
                  {" "}
                  Welcome To BLOGDOTCOM
                </h1>
                <h3 className="display-2 text-white text-uppercase mb-md-4"></h3>
                <Link
                  className="btn btn-primary py-md-3 px-md-5 me-3"
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login
                </Link>

                <Link
                  className="btn btn-primary py-md-3 px-md-5 me-3"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-target="#carouselExampleIndicators"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-target="#carouselExampleIndicators"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>
      <OurTeam />
      <Testimonial />
    </div>
  );
}
