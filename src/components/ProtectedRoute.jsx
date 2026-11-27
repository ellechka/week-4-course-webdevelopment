import {Navigate} from "react-router";
import {useUserContext} from "../hooks/contextHooks.js";

const ProtectedRoute = ({children}) => {
  const {user, isLoading} = useUserContext();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
