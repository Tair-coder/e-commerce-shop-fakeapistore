import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
function LoginForm(props) {
  // local storage has a data of user
  useEffect(() => {
    const sendData = async () => {
      await props
        .signInWithEmailAndPassword(
          props.auth,
          localStorage.getItem("email"),
          localStorage.getItem("password")
        )
        .then(() => {
          props.user();
          history.push("/products");
        })
        .catch((err) => console.log(err));
    };
    if (localStorage.getItem("email") !== null) {
      sendData();
    }
  }, []);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setBtnDisabled(true);
    await props
      .signInWithEmailAndPassword(
        props.auth,
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(() => {
        setError(false);
        if (props.auth.currentUser.emailVerified) {
          localStorage.setItem("email", emailRef.current.value);
          localStorage.setItem("password", passwordRef.current.value);
          setIsEmailVerified(true);
          props.user();
          history.push("/products");
        } else {
          setIsEmailVerified(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
    setBtnDisabled(false);
  };
  return (
    <form onSubmit={(e) => onSubmitHandler(e)}>
      <span>
        <label htmlFor="email">Enter email</label>
        <input id="email" name="email" type="text" ref={emailRef} />
      </span>
      <span>
        <label htmlFor="password">Enter password</label>
        <input id="password" name="password" type="text" ref={passwordRef} />
      </span>
      <button type="submit" disabled={btnDisabled}>
        Submit
      </button>
      {error && <p className="error_text">Invalid email or password</p>}
      {!isEmailVerified && (
        <p className="error_text">Please verify your email</p>
      )}
    </form>
  );
}

export default LoginForm;
