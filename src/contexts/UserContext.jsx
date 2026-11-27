import {createContext, useCallback, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import {useAuthentication, useUser} from "../hooks/apiHooks.js";

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();

  const handleLogin = useCallback(async (credentials) => {
    try {
      const loginResult = await postLogin(credentials);
      const token = loginResult.token;

      if (!token) {
        throw new Error("Login response did not contain a token");
      }

      localStorage.setItem("token", token);
      const userResult = await getUserByToken(token);
      setUser(userResult.user ?? userResult.data ?? userResult);
      navigate("/");
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      console.log(error.message);
    }
  }, [getUserByToken, navigate, postLogin]);

  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/", {replace: true});
    } catch (error) {
      console.log(error.message);
    }
  }, [navigate]);

  const handleAutoLogin = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user ?? userResult.data ?? userResult);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [getUserByToken]);

  const contextValue = useMemo(() => ({
    user,
    isLoading,
    handleLogin,
    handleLogout,
    handleAutoLogin,
  }), [user, isLoading, handleLogin, handleLogout, handleAutoLogin]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// The provider and context are intentionally colocated for this exercise.
// eslint-disable-next-line react-refresh/only-export-components
export {UserProvider, UserContext};
