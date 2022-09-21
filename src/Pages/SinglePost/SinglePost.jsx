import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../common/Api/axiosInstance";
import { useInfoContext } from "../../ContextApi/InfoContext";
import "./SinglePost.scss";
import { useNavigate } from "react-router-dom";

const SinglePost = () => {
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  const { userInfo, loading, setLoading } = useInfoContext();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [num, setNum] = useState(0);
  const commentRef = useRef();

  const eTitleRef = useRef();
  const eContentRef = useRef();

  const [isOwner, setIsOwner] = useState(false);

  const testPost = async () => {
    setLoading(true);
    let res = await axiosInstance.get(`/post/${id}`);
    setNum(res.data[0].comments.length);
    setPost(res.data[0]);
    setLoading(false);

    if (userInfo.info.id === res.data[0].authorId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };

  useEffect(() => {
    testPost();
  }, [id, change]);

  const addComment = async () => {
    try {
      let res = await axiosInstance.post(
        "/comment",
        { content: commentRef.current.value, postId: id },
        {
          headers: {
            access_token: localStorage.getItem("token"),
          },
        }
      );
      commentRef.current.value = "";
      toast.success(res.data.message);
      setChange(!change);
    } catch (error) {
      toast.warn(error.response.data.message);
    }
  };

  const deletePost = async () => {
    try {
      let res = await axiosInstance.delete(`/post/${id}`, {
        headers: { access_token: localStorage.getItem("token") },
      });
      toast.success(res.data.message);
      navigate("/cabinet");
    } catch (error) {
      toast.warn(error.message);
    }
  };

  const editPost = () => {
    eTitleRef.current.value = post.title;
    eContentRef.current.value = post.content;
  };

  const saveChanges = async () => {
    try {
      let response = await axiosInstance.put(`/post/${id}`, {
        title: eTitleRef.current.value,
        content: eContentRef.current.value
      }, {
        headers: {
          access_token: localStorage.getItem("token")
        }
      });

      toast.success(response.data.message);
      setChange(!change);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          <div className="col-7">
            <div className="content">
              <div className="author">
                <img
                  src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                  alt="img"
                  className="img-fluid img-circle"
                />
                <span>{post?.author[0].name}</span>
              </div>
              <div className="content-box">
                <img src={post?.image?.url} alt="image" className="img-fluid" />
                <h3>{post?.title}</h3>
                <p>{post?.content}</p>
              </div>
            </div>
          </div>
          <div className="col-5 py-5">
            <div className="d-flex info-box justify-content-around">
              <div className="info">
                <i className="fa-regular fa-heart"></i>
                <span>{post?.like.length} likes</span>
              </div>
              <div className="info">
                <i className="fa-regular fa-comment"></i>
                <span>{num} comments</span>
              </div>
              <div className="info">
                <i className="fa-solid fa-eye"></i>
                <span>{post?.views} views</span>
              </div>
            </div>
            <div>
              <div className="input-group">
                <input
                  id="comment"
                  type="text"
                  className="form-control"
                  ref={commentRef}
                />
                <button onClick={addComment} className="btn btn-primary">
                  add comment
                </button>
              </div>
            </div>
            <div className="actions">
              {isOwner ? (
                <div className="py-4">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#editPostModal"
                    onClick={editPost}
                    className="btn btn-warning"
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                  <button onClick={deletePost} className="btn btn-danger ms-3">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ) : (
                ""
              )}

              <div className="modal fade" id="editPostModal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title">Edit post params</h3>
                      <button
                        data-bs-dismiss="modal"
                        className="btn btn-close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <input
                        ref={eTitleRef}
                        className="form-control mb-3"
                        type="text"
                      />
                      <input
                        ref={eContentRef}
                        className="form-control mb-3"
                        type="text"
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={saveChanges}
                        data-bs-dismiss="modal"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
