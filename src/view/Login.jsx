import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import {useState} from "react";


const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="auth-page">
      {showLogin ? <LoginForm /> : <RegisterForm />}

      <button
        className="auth-switch"
        type="button"
        onClick={() => setShowLogin(!showLogin)}
      >
        {showLogin ? "Create an account" : "Back to login"}
      </button>
    </div>
  );
};

export default Login;
