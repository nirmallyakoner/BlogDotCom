import axios from "axios";
import React, { useState } from "react";

export default function ContactUs() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const fetchData = async (formData) => {
    try {
      const res = await axios.post(
        "https://restapinodejs.onrender.com/api/contact/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data); 
    } catch (error) {
      console.error(error); 
    }
  };

  const PostUserData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value }); 
  };

  const SubmitInfo = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("message", user.message);
    fetchData(formData);
  };

  return (
    <>
      <div className="map-section" style={{}}>
        <iframe
          style={{ border: 0, width: "100%", height: 350 }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
          frameBorder={0}
          allowFullScreen=""
        />
      </div>
      <section id="contact" className="contact">
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-10">
              <div className="info-wrap">
                <div className="row">
                  <div className="col-lg-4 info">
                    <i className="icofont-google-map" />
                    <h4>Location:</h4>
                    <p>
                      A108 Adam Street
                      <br />
                      New York, NY 535022
                    </p>
                  </div>
                  <div className="col-lg-4 info mt-4 mt-lg-0">
                    <i className="icofont-envelope" />
                    <h4>Email:</h4>
                    <p>
                      info@example.com
                      <br />
                      contact@example.com
                    </p>
                  </div>
                  <div className="col-lg-4 info mt-4 mt-lg-0">
                    <i className="icofont-phone" />
                    <h4>Call:</h4>
                    <p>
                      +1 5589 55488 51
                      <br />
                      +1 5589 22475 14
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5 justify-content-center" data-aos="fade-up">
            <div className="col-lg-10">
              <form
                action="/api/contact/create"
                method="post"
                role="form"
                className="form"
              >
                <div className="form-row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={PostUserData}
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={PostUserData}
                      id="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={user.phone}
                    onChange={PostUserData}
                    id="phone"
                    placeholder="Your Phone"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    value={user.message}
                    onChange={PostUserData}
                    rows={5}
                    placeholder="Message"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={SubmitInfo}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
