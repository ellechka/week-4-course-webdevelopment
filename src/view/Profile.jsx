import {useUserContext} from "../hooks/contextHooks.js";

const Profile = () => {
  const {user, isLoading} = useUserContext();

  if (isLoading || !user) {
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
