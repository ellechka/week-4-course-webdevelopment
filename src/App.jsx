import './App.css';
import Home from './view/Home.jsx';

import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './views/Layout';
import Profile from "./view/Profile.jsx";
import Single from "./view/Single.jsx";
import Upload from "./view/Upload.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/single" element={<Single />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
