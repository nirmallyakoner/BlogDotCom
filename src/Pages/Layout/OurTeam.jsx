import axios from "axios";
import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

export default function OurTeam() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let res = await axios.get("https://restapinodejs.onrender.com/api/team");
    setData(res?.data);
    setLoading(false);
  };

  const fetchphoto = (id) => {
    return `https://restapinodejs.onrender.com/api/team/photo/${id}`;

  };
  console.log(data);

  return (
    <>
      <section id="team" className="team section-bg">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>
              Our <strong>Team</strong>
            </h2>
            <p>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p>
          </div>
          {loading ? (
            <div
              style={{
                height: "900px",
                margin: "100px",
                marginLeft: "300px",
                marginTop: "100px",
              }}
            >
              <Shimmer />
            </div>
          ) : (
            <div className="row">
              {data?.TeamMember?.map((e) => {
                return (
                  <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                    <div className="member" data-aos="fade-up">
                      <div className="member-img">
                        <img
                          src={`${fetchphoto(e._id)}`}
                          className="img-fluid"
                          alt=""
                        />
                        <div className="social">
                          <a href="">
                            <i className="icofont-twitter" />
                          </a>
                          <a href="">
                            <i className="icofont-facebook" />
                          </a>
                          <a href="">
                            <i className="icofont-instagram" />
                          </a>
                          <a href="">
                            <i className="icofont-linkedin" />
                          </a>
                        </div>
                      </div>
                      <div className="member-info">
                        <h4>{e.name}</h4>
                        <span>{e.possession}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      {/* End Our Team Section */}
    </>
  );
}
