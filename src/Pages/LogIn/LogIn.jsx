import React, { useState } from "react";
import "./LogIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../common/Api/axiosInstance";

const LogIn = () => {
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

    if (Object.keys(user).length !== 2) {
      return toast.warn("Please input all polies!");
    }

    try {
      const info = await axiosInstance.post("/login", user);
      localStorage.setItem("token", info.data.token);
      if (info.data.token) {
        toast.success(info.data.message);
        navigate("/cabinet");
      }
    } catch (error) {
      console.log(error);
      toast.error("User not found!");
    }
  };

  return (
    <div className="LogIn">
      <div className="d-flex justify-content-center align-items-center">
        <div className="form-content">
          <h4 className="text-uppercase text-primary">Log in</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
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
              <button className="btn btn-primary">Submit</button>
              <div>
                <Link to="/signup">
                  You don't have an account? Register now.
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
