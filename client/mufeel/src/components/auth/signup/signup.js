import React from "react";
import signup from "../../../assets/img/Online world-cuate.png";
import logo from "../../../assets/img/logo_transparent.png";
import { Link } from "react-router-dom";
import Input from "../../form/input";
import "./signup.css";

/**
 * @author
 * @function SignUp
 **/

const SignUp = ({ loading, user, onBlur, onChange, onSubmit }) => {
  const { user_name, firstname, lastname, email, password, errors } = user;

  return (
    <div className="signup_page">
      <div className="signup_container">
        <div className="signup">
          <img src={signup} alt="signup" />
        </div>
        <div className="signup_form">
          <form onSubmit={onSubmit}>
            <div className="logo_div">
              <Link to="/">
                <img className="form_logo" src={logo} alt="logo" />
              </Link>
            </div>
            <h2>Join Us</h2>
            <div>
              <Input
                name="user_name"
                type="text"
                placeholder="Enter Username"
                value={user_name}
                onChange={onChange}
                onBlur={onBlur}
                text={{
                  module: "SignUp",
                  label: "Username",
                  error: errors.user_name,
                }}
              />
            </div>
            <div className="fullname">
              <Input
                name="firstname"
                type="text"
                placeholder="Enter Firstname"
                value={firstname}
                onChange={onChange}
                onBlur={onBlur}
                text={{
                  module: "SignUp",
                  label: "Firstname",
                  error: errors.firstname,
                }}
              />
              <Input
                name="lastname"
                type="text"
                placeholder="Enter Lastname"
                value={lastname}
                onChange={onChange}
                onBlur={onBlur}
                text={{
                  module: "SignUp",
                  label: "Lastname",
                  error: errors.lastname,
                }}
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={onChange}
                onBlur={onBlur}
                text={{
                  module: "SignUp",
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
                onBlur={onBlur}
                onChange={onChange}
                text={{
                  module: "SignUp",
                  label: "Password",
                  error: errors.password,
                }}
              />
            </div>
            <div className="signup_btn">
              <button type="submit" disabled={loading}>
                Submit
              </button>
            </div>
            <div className="old_here">
              Already have an account? <Link to="/login"> Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
