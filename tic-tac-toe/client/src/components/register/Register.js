import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Register({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const register = () => {
    Axios.post("http://localhost:3001/register", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;

      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };

  return (
    <div className="register">
      <label>Register</label>
      <input
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        placeholder="Password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={register}> Register</button>
    </div>
  );
}

export default Register;
