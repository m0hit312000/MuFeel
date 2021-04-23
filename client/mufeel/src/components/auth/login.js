import React from "react";
import Input from "../form/input";

/**
 * @author
 * @function Login
 **/

const Login = ({ message, loading, user, onChange, onBlur, onSubmit }) => {
  const { email, password, errors } = user;

  return (
    <div>
      <form onSubmit={onSubmit}>
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
        <div>
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
