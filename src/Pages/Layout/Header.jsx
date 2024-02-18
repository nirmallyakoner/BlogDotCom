import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Check_Token, Remove_Token } from "../../Redux/Authslice";

export default function Header() {
  const { toggle } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const remove = () => {
    dispatch(Remove_Token());
  };

  return (
    <>
      {/* ======= Header ======= */}
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
          <h1 className="logo mr-auto">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span>Blog</span>Dot<span>COM</span>
            </Link>
          </h1>
          <nav className="nav-menu d-none d-lg-block">
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>{" "}
              </li>

              <li>
                <Link to="/service" className="nav-link">
                  Service
                </Link>{" "}
              </li>
              <li>
                <Link to="/course" className="nav-link">
                  Courses
                </Link>{" "}
              </li>
              <li>
                <Link to="/bloglist" className="nav-link">
                  Blog
                </Link>{" "}
              </li>
              <li>
                <Link to="/contactus" className="nav-link">
                  Contact Us
                </Link>{" "}
              </li>
              <li>
                {toggle ? (
                  <Link to="/" onClick={remove} className="nav-link">
                    LogOut
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                )}
              </li>
              <li></li>
            </ul>
          </nav>
          {/* .nav-menu */}
        </div>
      </header>
      {/* End Header */}
    </>
  );
}
