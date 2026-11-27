import './App.css';
import Home from './view/Home.jsx';
import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './components/Layout.jsx';
import Profile from "./view/Profile.jsx";
import Single from "./view/Single.jsx";
import Upload from "./view/Upload.jsx";
import Login from "./view/Login.jsx";
import Logout from "./view/Logout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {UserProvider} from "./contexts/UserContext.jsx";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />
            <Route path="/single" element={<Single />} />
            <Route
              path="/upload"
              element={<ProtectedRoute><Upload /></ProtectedRoute>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
