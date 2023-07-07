import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Share = ({posts, setPosts}) => {

    const {currentUser} = useContext(AuthContext);

    const [share, setShare] = useState('');
    const [file, setFile] = useState(null);
    const [filedata, setFileData] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const [isErr, setIsErr] = useState(false);                   // handle right type upload

    useEffect(() => {
      let fileReader, isCancel = false;
      if (file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            setFileData(result);
          }
        }
        fileReader.readAsDataURL(file);
      }

      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      }

    }, [file])

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(selectedFile?.type)) {
        setIsErr(true);
        setErrMsg("Only jpeg, png, gif are allowed");
        return;
      }

      setIsErr(false);
      setFile(selectedFile);
    }

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
            userId: currentUser.id,
            file: file
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
        {filedata && 
        <div className="image-wrapper">
          <img className="image-preview" src={filedata} alt="preview" />
        </div>
        }
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={handleFileChange} />
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
        {isErr && <p>{errMsg}</p>}
      </div>
    </div>
  );
};

export default Share;