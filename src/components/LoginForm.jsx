import useForm from "../hooks/formHooks.js";
import {useAuthentication} from "../hooks/apiHooks.js";


const LoginForm = () => {
  const initValues = {
    username: '',
    password: '',
  };

  const {postLogin} = useAuthentication();

  const doLogin = async (formInputs) => {
    try {
      const loginResult = await postLogin(formInputs);

      localStorage.setItem("token", loginResult.token);
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doLogin, initValues);

  return (
    <section className="auth-card" aria-labelledby="login-title">
      <h1 id="login-title">Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginForm;
