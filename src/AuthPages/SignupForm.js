import React, { useState } from "react";
import { useRef } from "react";

function SignupForm(props) {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setBtnDisabled(true);
    await props
      .createUserWithEmailAndPassword(
        props.auth,
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(async () => {
        console.log("successfuly signup");
        await props.sendEmailVerification(props.auth.currentUser);
        alert("Please confirm your email adress by click on link in your mail");
        props.setNewUserHandler();
      })
      .catch(() => setError(true));
    setBtnDisabled(false);
    emailRef.current.value = "";
    passwordRef.current.value = "";
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
    </form>
  );
}

export default SignupForm;
