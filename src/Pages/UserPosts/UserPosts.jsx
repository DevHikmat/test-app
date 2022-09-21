import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from '../../common/Api/axiosInstance';

const UserPosts = () => {
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        ;(async() => {
            let response = await axiosInstance.get("/my", {
                headers: {
                    access_token: localStorage.getItem("token")
                }
            })
            setMyPosts(response.data);
        })()
    }, [])
  return (
    <div>
        <div className="container">
            {
                myPosts.length > 0 ? (
                    myPosts.map(post => {
                        return <div className="row border px-2 my-2">
                            <div className="col-3">
                                <img style={{width: "100%", height: "200px", objectFit: "cover"}} src={post.image.url} alt={post.title} className="img-fluid" />
                            </div>
                            <div className="col-9">
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                        </div>
                    })
                ) : <h1>You don't have any post now.</h1>
            }
        </div>
    </div>
  )
}

export default UserPosts