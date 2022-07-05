import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DemoButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
    }
    history.push("/main");
  };

  return (
    <form onSubmit={onLogin}>
      <div>
        <button
          onClick={(e) => {
            setEmail("demouser@aa.io");
            setPassword("123456");
          }}
          type="demo"
        >
          <i id="nav-icons" className="fa-solid fa-eye"></i>
          <p id="nav-text">Demo</p>
        </button>
      </div>
      <div>
        {errors?.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>
    </form>
  );
}

export default DemoButton;
