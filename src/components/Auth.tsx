import React, { useState } from "react";
import { auth, storage } from "../firebase";
import {useUpdateUserProfile} from '../context/userContext'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };
  const signIn = async () => {
    auth.signInWithEmailAndPassword(email, password);
  };
  const signUp = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
    let url = "";
    if (avatarImage) {
      const fileName = avatarImage.name;
      await storage.ref(`avatars/${fileName}`).put(avatarImage);
      url = await storage.ref("avatars").child(fileName).getDownloadURL();
    }
    await authUser.user?.updateProfile({
      displayName: userName,
      photoURL: url,
    });
    const updateUserProfile = useUpdateUserProfile()
    updateUserProfile(authUser)
  };

  return (
    <>
      (
      <div className="container">
        <div className="authImage"></div>

        <div className="authForm">
          {!isLogin && (
            <>
              <form className="form-auth">
                <label>
                  name
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={userName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserName(e.target.value)
                    }
                  />
                </label>
                <label>
                  <input type="file" onChange={onChangeImageHandler} />
                </label>
              </form>
            </>
          )}
          <form className="form-auth">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="email"
              id="email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => {
                isLogin ? signIn() : signUp();
              }}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <div>
            <span></span>
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "create new acount" : "Login"}
            </span>
          </div>
        </div>
      </div>
      )
    </>
  );
};

export default Auth;
