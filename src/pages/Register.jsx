import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const age = e.target[3].value;
    const gender = e.target[4].value;
    const language = e.target[5].value;
    const year = e.target[6].value;
    const english = e.target[7].value;
    const file = e.target[8].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              age,
              displayName,
              email,
              english,
              gender,
              language,
              photoURL: downloadURL,
              year,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">InterConnect</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required type="number" placeholder="age" />
          <label className="slabel" for="gender">Choose your Gender:</label>
          <div className="selectContain">
            <select required id="gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <label className="slabel" for="language">Choose your Language:</label>
          <div className="selectContain">
            <select required id="language" name="language">
              <option value="spanish">Spanish</option>
              <option value="chinese">Chinese</option>
              <option value="malayalam">Malayalam</option>
              <option value="hindi">Hindi</option>
              <option value="serbian">Serbian</option>
            </select>
          </div>
          <label className="slabel" for="year">Choose your School Year:</label>
          <div className="selectContain">
            <select required id="year" name="year">
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>
          <label className="slabel" for="english">Do you know English?</label>
          <div className="selectContain">
            <select required id="english" name="english">
              <option value="yes">No</option>
              <option value="no">Yes</option>
            </select>
          </div>
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
