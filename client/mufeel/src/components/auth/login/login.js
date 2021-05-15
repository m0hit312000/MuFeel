import React from "react";
import { Link } from "react-router-dom";
import Input from "../../form/input";
import logo from "../../../assets/img/logo_transparent.png";
import sideImg from "../../../assets/img/Online wishes-rafiki.png";
import "./login.css";

/**
 * @author
 * @function Login
 **/

const Login = ({ message, loading, user, onChange, onBlur, onSubmit }) => {
  const { email, password, errors } = user;

  return (
    <div className="login_page">
      <div className="login_container">
        <div className="login">
          <img src={sideImg} alt="sideImg" />
        </div>
        <div className="login_form">
          <form onSubmit={onSubmit}>
            <div className="logo_div">
              <Link to="/">
                <img className="form_logo" src={logo} alt="logo" />
              </Link>
            </div>
            <h2>Welcome Back</h2>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={onChange}
                onBlur={onBlur}
                text={{
                  module: "login",
                  label: "Email",
                  error: errors.email,
                }}
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={onChange}
                onBlur={onBlur}
                text={{
                  module: "login",
                  label: "Password",
                  error: errors.password,
                }}
              />
            </div>
            <div className="login_btn">
              <button type="submit" disabled={loading}>
                Submit
              </button>
            </div>
            <div className="new_here">
              New Here? <Link to="/signup"> Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
