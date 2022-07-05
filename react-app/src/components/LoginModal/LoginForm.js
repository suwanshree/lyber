import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoButton from "../auth/DemoButton";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    history.push("/main");
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (sessionUser) return <Redirect to="/main" />;

  return (
    <div className="auth-form-container">
      <div className="auth-form-left">
        <form className="auth-form" onSubmit={onLogin}>
          <h3>Login</h3>
          <ul className="errors-div">
            {errors.map((error, ind) => (
              <li key={ind}>{error}</li>
            ))}
          </ul>
          <div className="user-box">
            <label className="auth-label" htmlFor="email">
              Email *
            </label>
            <input
              className="auth-input"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="user-box">
            <label className="auth-label" htmlFor="password">
              Password *
            </label>
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button id="auth-submit" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="auth-form-right">
        <div className="line right">
          <div className="scanner"></div>
        </div>
        <h3>Login Info</h3>
      </div>
    </div>
  );
}

export default LoginForm;
