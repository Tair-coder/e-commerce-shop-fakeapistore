import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import styles from "./Main.module.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import CardForm from "../UI/CardForm";
import { useDispatch } from "react-redux";
import { fetchSlideAction } from "../store/fetch-slice";
const firebaseConfig = {
  apiKey: "AIzaSyBq_xS6WmxxuapIy_qWK0918j6tlfUtO90",
  authDomain: "e-commerce-shop-d6bd3.firebaseapp.com",
  databaseURL: "https://e-commerce-shop-d6bd3-default-rtdb.firebaseio.com",
  projectId: "e-commerce-shop-d6bd3",
  storageBucket: "e-commerce-shop-d6bd3.appspot.com",
  messagingSenderId: "1078082683173",
  appId: "1:1078082683173:web:fdfbef41b9b4d550c95acc",
  measurementId: "G-N6YYNX1R7M",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function Main(props) {
  const dispatchFunction = useDispatch();
  const [newUser, setNewUser] = useState(false);
  const setNewUserHandler = () => {
    setNewUser(!newUser);
  };
  const setUserHandler = () => {
    //this functions calls when user log in then  that you can get user uid
    dispatchFunction(
      fetchSlideAction.getUserUid({ uid: auth.currentUser.uid })
    );
  };
  return (
    <div className={styles.main}>
      <h1>Welcome back!</h1>
      {newUser ? (
        <CardForm>
          <button onClick={setNewUserHandler} className={styles.main__backBtn}>
            Back
          </button>
          <SignupForm
            auth={auth}
            sendEmailVerification={sendEmailVerification}
            createUserWithEmailAndPassword={createUserWithEmailAndPassword}
            setNewUserHandler={setNewUserHandler}
          />
        </CardForm>
      ) : (
        <CardForm>
          <LoginForm
            auth={auth}
            signInWithEmailAndPassword={signInWithEmailAndPassword}
            user={setUserHandler}
          />
          <button
            onClick={setNewUserHandler}
            className={styles.main__signupBtn}
          >
            Haven't account yet? Create
          </button>
        </CardForm>
      )}
    </div>
  );
}

export default Main;
