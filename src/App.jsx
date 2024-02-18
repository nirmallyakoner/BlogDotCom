// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Blog from "./Pages/Layout/Blog";
import Testimonial from "./Pages/Layout/Testimonial";
import Service from "./Pages/Layout/Service";
import OurTeam from "./Pages/Layout/OurTeam";
import Course from "./Pages/Layout/Course";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ApplyNow from "./Pages/Layout/ApplyNow";
import Header from "./Pages/Layout/Header";
import Home from "./Pages/Layout/Home";
import Footer from "./Pages/Layout/Footer";
import ContactUs from "./Pages/Layout/ContactUs";
import { useDispatch } from "react-redux";
import { Suspense, useEffect } from "react";
import { Check_Token } from "./Redux/Authslice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Check_Token());
  }, []);

  const PrivateRoute = ({ children }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/login" />
        {alert("Please login First")}
      </>
    );
  };
  const PublicRouteNames = [
    {
      path: "/",
      Component: <Home />,
    },
    {
      path: "/login",
      Component: <Login />,
    },
    {
      path: "/register",
      Component: <Register />,
    },
    {
      path: "/course",
      Component: <Course />,
    },

    {
      path: "/team",
      Component: <OurTeam />,
    },
    {
      path: "/testimonial",
      Component: <Testimonial />,
    },
    {
      path: "/service",
      Component: <Service />,
    },
    {
      path: "/contactus",
      Component: <ContactUs />,
    },
  ];

  const PrivateRouteNames = [
    {
      path: "/bloglist",
      Component: <Blog />,
    },

    {
      path: "/applynow/:id",
      Component: <ApplyNow />,
    },
  ];

  return (
    <>
      <Suspense fallback={<h1>loading</h1>}>
        <Router>
          <Header />
          <div style={{ marginTop: "50px" }}>
            <Routes>
              {PublicRouteNames?.map((route, index) => {
                return (
                  <Route
                    exact
                    path={route.path}
                    key={index}
                    element={route.Component}
                  />
                );
              })}

              {PrivateRouteNames?.map((route, index) => {
                return (
                  <Route
                    exact
                    path={route.path}
                    key={index}
                    element={<PrivateRoute>{route.Component}</PrivateRoute>}
                  />
                );
              })}
            </Routes>
          </div>
          <Footer />
        </Router>
      </Suspense>
    </>
  );
}

export default App;
