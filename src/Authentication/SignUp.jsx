import "./SignUp.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../store/Redux";
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { databaseAction } from "../store/Redux_database";

const SignUp = () => {
  const dispatch = useDispatch();
  const validPass = useSelector((state) => state.authReducer.auth);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState("");

  const navigate = useNavigate();

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (validPass) {
      navigate("/");
    }
  }, [validPass]);

  useEffect(() => {
    checkEmailExists(email);
  }, [email]);

  const checkEmailExists = async (email) => {
    const userResponse = await fetch(
      "https://hard-88a4f-default-rtdb.firebaseio.com/users.json"
    );
    const userResData = await userResponse.json();
    for (let userId in userResData) {
      if (userResData[userId].email === email) {
        setEmailExists(email);
        break;
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (password.trim().length >= 6) {
      dispatch(authAction.authentication());
    } else {
      setError("Password not long enough");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // The user has been created and signed in

        // Get the user
        const user = userCredential.user;

        // Get a reference to the database service
        const db = getDatabase();

        // Create a reference to the 'users' node in your database
        const userRef = ref(db, "users/" + user.uid);

        // Check if the user node exists
        // If it exists, update it with email, workout, and diet
        // If it doesn't exist, create it with email, workout, and diet
        const userNodeData = {
          email: email,
          diet: "",
          workout: "",
          startingDate: "",
          displayButton: false,
          dayCount: 0,
        };

        // Set the user data
        set(userRef, userNodeData)
          .then(() => {
            console.log("User data updated successfully.");
            dispatch(databaseAction.saveUserData(user.uid)); // Dispatch the user's UID
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <main className="signup-main">
        <h1 className="signup-title">SIGNUP</h1>
        <form className="signup-form" onSubmit={submitHandler}>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailExists === email && email !== "" ? (
              <p>User already exists</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="At least 6 characters long"
              value={password}
              onChange={passwordHandler}
            />
            <p>{error}</p>
          </div>
          <button
            type="submit"
            className="button-signUp"
            disabled={emailExists === email && email !== ""}
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default SignUp;
