import React, { useState } from "react";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../common/Api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Object.keys(user).length !== 4) {
        toast.warn("Please input all polies!");
    } else {
        try {
            await axiosInstance.post("/signup", user);
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  };
  return (
    <div className="SignUp">
        <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div className="form-content">
          <h4 className="text-uppercase text-primary">Sign Up</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="name">
              <b className="text-danger">*</b> First name
            </label>
            <input
              onChange={(e) => getUserInfo(e)}
              name="name"
              id="name"
              type="text"
              className="form-control"
            />
            <label htmlFor="surname">
              <b className="text-danger">*</b> Last name
            </label>
            <input
              onChange={(e) => getUserInfo(e)}
              name="surname"
              id="surname"
              type="text"
              className="form-control"
            />
            <label htmlFor="email">
              <b className="text-danger">*</b> E-mail
            </label>
            <input
              onChange={(e) => getUserInfo(e)}
              name="email"
              id="email"
              type="email"
              className="form-control"
            />
            <label htmlFor="password">
              <b className="text-danger">*</b> Password
            </label>
            <input
              onChange={(e) => getUserInfo(e)}
              name="password"
              type="password"
              id="password"
              className="form-control"
            />
            <div className="d-grid">
              <button className="btn btn-primary">Register</button>
              <div>
                <Link to="/login">Have you an account? Login now.</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
