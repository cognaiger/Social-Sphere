import "./posts.scss"
import Post from "../post/Post";
import axios from "axios";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:2504/post/getPost/11");
        setPosts(res.data);
      } catch(error) {
        console.log(error);
      }
    }

    fetchData()
  }, [])

    return (
        <div className="posts">
            {posts.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
};

export default Posts;