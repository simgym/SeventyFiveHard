import "./LogIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../store/Redux";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { databaseAction } from "../store/Redux_database";

const LogIn = () => {
  const dispatch = useDispatch();
  const validPass = useSelector((state) => state.authReducer.auth);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (password.trim().length >= 6) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          // Dispatch the user's UID
          dispatch(databaseAction.saveUserData(user.uid));

          dispatch(authAction.authentication()); // Dispatch action on successful login
          navigate("/");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          let errorMessage = error.message;

          if (errorCode === "auth/wrong-password") {
            errorMessage = "Wrong password.";
          } else if (errorCode === "auth/invalid-login-credentials") {
            errorMessage = "Invalid login credentials";
          } else if (errorCode === "auth/invalid-email") {
            errorMessage = "Email address is not valid.";
          }

          setError(errorMessage);
          console.log(errorCode);
        });
    } else {
      setError("Password not long enough");
    }
  };

  return (
    <>
      <main className="login-main">
        <h1 className="login-title">LOGIN</h1>
        <form className="login-form" onSubmit={submitHandler}>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              onChange={passwordHandler}
              placeholder="At least 6 characters long"
              value={password}
            />
            <p className="error-message">{error}</p>
          </div>

          <button type="submit" className="button-login">
            Submit
          </button>
        </form>
        <p>Don't have an account</p>
        <Link to="/signUp" className="register-link">
          Register
        </Link>
      </main>
    </>
  );
};

export default LogIn;
