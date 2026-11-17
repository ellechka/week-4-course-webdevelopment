import MediaRow from '../components/MediaRow.jsx';
import {useEffect, useState} from "react";

const API_URL = import.meta.env.VITE_MEDIA_API;

const Home = () => {
  const [mediaAray, setMediaArray] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const mediaResponse = await fetch(`${API_URL}/media`);
        if (!mediaResponse) {
          throw new Error('Not possible to upload the media');
        }

        const media = await mediaResponse.json();

        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const userResponse = await fetch(
              `${API_URL}/users/${item.user_id}`,
            );
            if (!userResponse) {
              throw new Error(`Not possible to upload the user ${item}`);
            }

            const user = await userResponse.json();
            return (...item, user);
          }),
        );

        setMediaArray(mediaWithUsers);
      } catch (error) {
        setError(error.message);
      }
    };
    loadMedia();
  }, []);
  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
        {mediaArray.map((item) => (
          <MediaRow
            key={item.media_id}
            item={item}
          />
        ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
