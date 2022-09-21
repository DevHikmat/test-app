import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../common/Api/axiosInstance";
import { useInfoContext } from "../../ContextApi/InfoContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useInfoContext();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      (async () => {
        try {
          let res = await axiosInstance.get("/", {
            headers: {
              access_token: token,
            },
          });
          setUserInfo({ login: true, info: res.data.user });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const logOut = () => {
    window.location.reload();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [postData, setPostData] = useState("");


  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Post App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <i className="fa-solid fa-home"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link">
                  <i className="fa-solid fa-square-plus"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="fa-solid fa-heart"></i>
                </a>
              </li>
            </ul>
            <div className="input-group">
              <input
                onKeyUp={(e) => {
                  navigate(`?title=${e.target.value}`)
                }}
                type="text"
                name="title"
                className="form-control"
                placeholder="Search post..."
              />
              <Link to={`?title=${postData}`} className="btn btn-primary">
                Search
              </Link>
            </div>
            <div>
              {userInfo.login ? (
                <div>
                  {userInfo.info.avatar ? (
                    <img className="img-fluid ms-5" src="" alt="avatar" />
                  ) : (
                    <span className="ms-5"></span>
                  )}
                  <div className="dropdown">
                    <button
                      className="btn btn-dark dropdown-toggle"
                      id="userAction"
                      data-bs-toggle="dropdown"
                    >
                      {userInfo.info.name}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="userAction">
                      <li className="dropdown-item">
                        <Link to="/createpost" className="text-dark">
                          <i className="fa-solid fa-plus me-2"></i>
                          <span>Add post</span>
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/myposts" className="text-dark">
                          <i className="fa-solid fa-images me-2"></i>
                          <span>All of my posts</span>
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <i className="fa-solid fa-gear me-2"></i>
                        <span>Settings</span>
                      </li>
                      <li
                        onClick={logOut}
                        className="dropdown-item text-danger"
                      >
                        <i className="fa-solid fa-arrow-left me-2"></i>
                        <span>Log out</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <button className="btn btn-sm btn-success ms-5">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn btn-sm btn-primary ms-3">
                    <Link to="/signup">Register</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
