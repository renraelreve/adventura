import { useState, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { FavouritesContext } from "../store/FavouritesContext";
import Success from "../components/Success";

function Login() {
  const { loginHandler, isLoggedIn } = useContext(AuthContext);
  const favouritesctx = useContext(FavouritesContext);

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
    loginHandler();
    favouritesctx.handleloadFavourites();
  };

  return (
    <div>
      <h1>Login</h1>
      {!isLoggedIn && (
        <div style={{ display: "block", gap: 2 }}>
          <input style={{margin: 7}}
            type="text"
            name="username"
            onChange={formChangeHandler}
            value={loginForm.username}
            placeholder="User Name" />
          <input style={{margin: 7}}
            type="password"
            name="password"
            onChange={formChangeHandler}
            value={loginForm.password}
            placeholder="Password" />
          <button style={{width: 200, marginLeft: 5}} type="submit" onClick={handleSubmit}>
            Log in
          </button>
        </div>
      )}
      {isLoggedIn && (
        <>
          <Success message = {
          <span>You are logged in!<br/><br/><br/>
          You can now <br/><br/><br/> 
          Track your Favourites<br/><br />
          Add your own rating<br/><br />
          Manage own comments</span>} />
          {/* <Link to="/">Back to Home</Link> */}
        </>
      )}
    </div>
  );
}

export default Login;