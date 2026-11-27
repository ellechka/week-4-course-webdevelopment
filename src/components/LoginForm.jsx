import useForm from "../hooks/formHooks.js";
import {useUserContext} from "../hooks/contextHooks.js";


const LoginForm = () => {
  const initValues = {
    username: '',
    password: '',
  };

  const {handleLogin} = useUserContext();
  const doLogin = (formInputs) => handleLogin(formInputs);

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
