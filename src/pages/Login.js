import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

function Login() {
  const { loginHandler, isLoggedIn } = useContext(AuthContext);

  // manage form data
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const formChangeHandler = (e) => {
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  // function that is called when user logs in
  const handleSubmit = () => {
    // user will always login
    // call the API to login, return some auth token 
    console.log('login clicked');
    loginHandler();
    console.log('loginHandler Called, BUT NOT CHANGING STATE!!', isLoggedIn);
  };

  return (
    <div>
      <h1>Login</h1>
      {!isLoggedIn && (
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            name="username"
            onChange={formChangeHandler}
            value={loginForm.username}
            placeholder="User Name" />
          <input
            type="password"
            name="password"
            onChange={formChangeHandler}
            value={loginForm.password}
            placeholder="Password" />
          <button type="submit" onClick={handleSubmit}>
            Log in
          </button>
        </div>
      )}
      {isLoggedIn && (
        <>
          <div style={{ padding: 20, }}>You are logged in!</div>
          <Link to="/">Back to Home</Link>
        </>
      )}
    </div>
  );
}

export default Login;