import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
// import DemoButton from "../auth/DemoButton";

const SignupForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else setErrors(["Passwords did not match. Please try again."]);
    history.push("/main");
  };

  if (sessionUser) return <Redirect to="/main" />;

  return (
    <div className="auth-form-container">
      <div className="auth-form-left">
        <form className="auth-form" onSubmit={onSignUp}>
          <h3>Sign Up</h3>
          <ul className="errors-div">
            {errors.map((error, ind) => (
              <li key={ind}>{error}</li>
            ))}
          </ul>
          <div>
            <label className="auth-label">User Name *</label>
            <input
              className="auth-input"
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></input>
          </div>
          <div>
            <label className="auth-label">Email *</label>
            <input
              className="auth-input"
              type="text"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </div>
          <div>
            <label className="auth-label">Password *</label>
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>
          <div>
            <label className="auth-label">Confirm Password *</label>
            <input
              className="auth-input"
              type="password"
              name="repeat_password"
              placeholder="repeat password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button id="auth-submit" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className="auth-form-right">
        <div className="line right">
          <div className="scanner"></div>
        </div>
        <h3>Sign Up Info</h3>
      </div>
    </div>
  );
};

export default SignupForm;
