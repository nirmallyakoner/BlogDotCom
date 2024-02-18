import axios from "axios";
import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

export default function Testimonial() {
  const [testimonial, setTestimonial] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let res = await axios.get(
      "https://restapinodejs.onrender.com/api/testimonial"
    );
    setTestimonial(res?.data);
    setLoading(false); // Set loading to false once the data is fetched
  };

  const fetchphoto = (id) => {
    return `https://restapinodejs.onrender.com/api/testimonials/photo/${id}`;
  };

  console.log(testimonial);
  return (
    <div>
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
        <section id="testimonials" className="testimonials section-bg pt-5">
          <div className="container">
            <div className="section-title">
              <h2>Testimonials</h2>
              <p>{testimonial?.message}</p>
            </div>
            <div className="row">
              {testimonial?.testimonials?.map((item) => (
                <div
                  key={item.id}
                  className="col-lg-6"
                  data-aos="fade-up"
                  data-aos-delay={100}
                  style={{ marginBottom: "25px" }}
                >
                  <div className="testimonial-item">
                    <img
                      src={`${fetchphoto(item._id)}`}
                      className="testimonial-img"
                      style={{
                        height: "90px",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                    <h3>{item.name}</h3>
                    <h4>{item.position}</h4>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      {item.talk}
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
