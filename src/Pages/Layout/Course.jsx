import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Course() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let res = await axios.get("https://restapinodejs.onrender.com/api/course");
    setData(res?.data);
  };
  const fetchPhoto = (id) => {
    return `https://restapinodejs.onrender.com/api/course/photo/${id}`;

  };
  console.log(data);
  return (
    <>
      <section id="pricing" className="pricing">
        <div className="container" data-aos="fade-up">
          <div className="row mt-5">
            {data?.Courses?.map((i) => {
              return (
                <div className="col-lg-3 col-md-6">
                  <div
                    className="box"
                    style={{ height: "450px", margin: "10px" }}
                  >
                    <h3>{i.name}</h3>
                    <img
                      src={fetchPhoto(i._id)}
                      style={{ height: "120px", width: "120px" }}
                      alt=""
                    />

                    <h4>
                      <sup>$</sup>
                      {i.fees}
                      <span> for {i.duration}</span>
                    </h4>
                    <ul>
                      <li>{i.slug}</li>
                      <li>
                        <b>Requirement: {i.requirement}</b>
                      </li>
                    </ul>
                    <div className="btn-wrap">
                      <Link
                        to={`/applynow/${i._id}`}
                        className="btn-buy"
                        style={{ textDecoration: "none" }}
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
