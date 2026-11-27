import { useEffect, useState } from "react";
import {useUser} from "../hooks/apiHooks.js";

const Profile = () => {
  const {getUserByToken} = useUser();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const loadUser = async () => {
      try {
        const userData = await getUserByToken(token);
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    loadUser();
  }, [getUserByToken, token]);

  if (!token) {
    return (
      <section className="profile-card profile-message">
        <p>You are not logged in.</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className="profile-card profile-message" role="alert">
        <p>{error}</p>
      </section>
    );
  }
  if (!user) {
    return (
      <section className="profile-card profile-message">
        <p>Loading profile...</p>
      </section>
    );
  }

  const profile = user.user ?? user.data ?? user;
  const username = profile.username || profile.name || "Username unavailable";

  return (
    <section className="profile-card">
      <p className="profile-eyebrow">Your account</p>
      <h1 className="profile-username">{username}</h1>
      <dl className="profile-details">
        <div>
          <dt>Username</dt>
          <dd>{username}</dd>
        </div>
        {profile.email && (
          <div>
            <dt>Email</dt>
            <dd>{profile.email}</dd>
          </div>
        )}
      </dl>
    </section>
  );
};

export default Profile;
