import useForm from "../hooks/formHooks.js";
import {useUser} from "../hooks/apiHooks.js";

const RegisterForm = () => {
  const {postUser} = useUser();

  const initValues = {
    username: "",
    email: "",
    password: "",
  };

  const doRegister = async (formInputs) => {
    try {
      const result = await postUser(formInputs);
      console.log(result);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doRegister, initValues);

  return (
    <section className="auth-card" aria-labelledby="register-title">
      <h1 id="register-title">Register</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="register-username">Username</label>
          <input
            id="register-username"
            name="username"
            type="text"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            name="email"
            type="email"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            name="password"
            type="password"
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default RegisterForm;
