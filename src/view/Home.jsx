import MediaRow from '../components/MediaRow.jsx';
import { useMedia } from '../hooks/apiHooks.js';
import Single from "./Single.jsx";
import {useState} from "react";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { mediaArray, error} = useMedia();

  return (
    <>
      {error && <p>{error}</p>}
      <Single item={selectedItem} setSelectedItem={setSelectedItem} />
      <table>
        <tbody>
        {mediaArray.map((mediaItem) => (
          <MediaRow
            key={mediaItem.media_id}
            item={mediaItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
