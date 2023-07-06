import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import Comments from "../comments/Comments";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  //TEMPORARY
  const liked = false;

  const calTime = (date) => {
    const createdTime = new Date(date);
    const createdTimemili = createdTime.getTime();
    const current = Date.now();
    const timePassed = (current - createdTimemili) / 1000;
    if (timePassed < 60) {
      const s = Math.round(timePassed);
      return `${s} s ago`;
    } else if (timePassed < 60 * 60) {
      const m = Math.round(timePassed / 60);
      return `${m} min ago`;
    } else if (timePassed < 60 * 60 * 24) {
      const h = Math.round(timePassed / 3600);
      return `${h} h ago`;
    } else {
      const d = Math.round(timePassed / 3600 / 24);
      return `${d} day ago`;
    }
  }

  if (post === null) {
    console.log("404");
    return "404";
  }

  console.log(post);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <Link
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                <span className="date">{calTime(post.createdAt)}</span>
              </Link>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
          {commentOpen && <Comments />}
        </div>
      </div>
    </div>
  );
};

export default Post;