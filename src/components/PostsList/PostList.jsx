import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../common/Api/axiosInstance";
import { useInfoContext } from "../../ContextApi/InfoContext";
import PostCard from "../PostCard/PostCard";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const { loading, setLoading } = useInfoContext();
  const [searchParams, setSearchParams] = useSearchParams("");

  useEffect(() => {
    (async () => {
      let searchText = searchParams.get("title");
      if (searchText) {
        let interval;
        clearTimeout(interval);
        interval = setTimeout(async () => {
          setPosts([]);
          setLoading(true);
          let searchPosts = await axiosInstance.get(
            `/search?title=${searchText}`,
            {
              headers: { access_token: localStorage.getItem("token") },
            }
          );
          setPosts(searchPosts.data);
          setLoading(false);
        }, 1000);
      } else {
        (async () => {
          let res = await axiosInstance.get("/post", {
            headers: {
              access_token: localStorage.getItem("token"),
            },
          });
          setPosts(res.data);
          setLoading(false);
        })();
      }
    })();
  }, [searchParams]);
  return (
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          {posts.length &&
            posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
        </div>
      )}
    </div>
  );
};

export default PostList;
