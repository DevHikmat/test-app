import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../common/Api/axiosInstance";

const CreatePost = () => {
  const [isSelect, setIsSelect] = useState(false);

  const titleRef = useRef();
  const contentRef = useRef();
  const imgRef = useRef();
  let output_img = document.getElementById("output_img");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", imgRef.current.files[0]);
    data.append("title", titleRef.current.value);
    data.append("content", contentRef.current.value);

    let token = localStorage.getItem("token");

    try {
      let res = await axiosInstance.post("/post", data, {
        headers: {
          access_token: token,
        },
      });
      toast.success(res.data.message);
      titleRef.current.value = "";
      contentRef.current.value = "";
      imgRef.current.value = "";
      output_img.setAttribute("src", "");
    } catch (error) {
      toast.warn("Please input all lines...");
    }
  };

  const handleChange = (event) => {
    document.getElementById("output_img").src = URL.createObjectURL(event.target.files[0]);
    setIsSelect(true);
  }

  const imgStyle = {
    display: isSelect ? "block" : "none"
  }

  return (
    <div className="CreatePost">
      <div className="container">
        <div className="row py-5">
          <div className="col-6">
            <form
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <input
                ref={titleRef}
                type="text"
                className="form-control mb-3"
                placeholder="Enter post title"
              />
              <textarea
                ref={contentRef}
                placeholder="Describe your post..."
                className="form-control mb-3"
                cols="30"
                rows="10"
              ></textarea>
              <input
                ref={imgRef}
                id="file"
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={(e) => handleChange(e)}
              />
              <button className="btn btn-primary w-100">Create post</button>
            </form>
          </div>

          <div className="col-6">
            <div className="img-box overflow-hidden">
                {
                    isSelect ? "" : <i className="fa-solid fa-plus text-primary"></i>
                }
                <img style={imgStyle} src="" alt="output_img" id="output_img" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
