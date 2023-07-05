import { useParams } from "react-router-dom";
import Post from "../post/Post";
import axios from "axios";
import { useState, useEffect } from "react";

const PostView = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
          const response = await axios.get(`http://localhost:2504/post/${id}`);
          if (response.status === 200) {
            setPost(response.data);
          } else {
            console.log("Can't find this post");
          }
        }
    
        fetch();
    }, [id]);

    return (
        <Post post={post} />
    )
}

export default PostView;