import {useEffect} from "react";
import {Link, Outlet} from "react-router";
import {useUserContext} from "../hooks/contextHooks.js";

const Layout = () => {
  const {user, handleAutoLogin, isLoading} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, [handleAutoLogin]);

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {!isLoading && user && (
              <>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/upload">Upload</Link></li>
                <li className="nav-username">{user.username}</li>
                <li><Link to="/logout">Logout</Link></li>
              </>
            )}
            {!isLoading && !user && (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
