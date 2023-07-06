import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Share = ({posts, setPosts}) => {

    const {currentUser} = useContext(AuthContext);

    const [share, setShare] = useState('');

    async function getPost(id) {
      const response = await axios.get(`http://localhost:2504/post/${id}`);
      if (response.status === 200) {
        const post = response.data;
        return post;
      } else {
        return null;
      }
    }

    async function handleShare(e) {
        e.preventDefault();

        const response = await axios.post("http://localhost:2504/post/create", {
            description: share,
            userId: currentUser.id
        })

        if (response.status === 201) {
          const newPost = await getPost(response.data);
          if (newPost !== null) {
            const newPosts = [newPost, ...posts];
            setPosts(newPosts);
          }
        } else {
          console.log('error');
        }

        setShare('');
    }


  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} 
          value={share} onChange={(e) => setShare(e.target.value)}/>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;