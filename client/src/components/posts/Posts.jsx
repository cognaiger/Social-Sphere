import "./posts.scss"
import Post from "../post/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import Share from "../share/Share";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:2504/post/getPost/11");
        if (!ignore) {
          setPosts(res.data);
        }
      } catch(error) {
        console.log(error);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

    return (
      <div>
        <Share posts={posts} setPosts={setPosts} />
        <div className="posts">
            {posts.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
      </div>
        
    )
};

export default Posts;