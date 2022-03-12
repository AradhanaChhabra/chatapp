import React, { useState } from "react";
import { loginUser } from "../../api/user";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const changeHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setemail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let user = await loginUser(email, password);
    console.log(user);
    if (user.data.message) {
      alert(user.data.message);
    } else {
      localStorage.setItem("token", user.data.token);
      navigate("/home");
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler} className="loginForm">
        <h1 className="loginH1">Login</h1>
        <input className="loginInput"
          value={email}
          type="text"
          name="email"
          onChange={changeHandler}
          placeholder="Enter the Email Address"
        />
        <input
          className="loginInput"
          value={password}
          type="password"
          name="password"
          onChange={changeHandler}
          placeholder="Enter the Password"
        />
        <input type="submit" name="submit" className="loginBtn"/>
        <Link to="/signup" className="Logintext">
          Create a new one?
        </Link>
      </form>
    </div>
  );
}

export default Login;
