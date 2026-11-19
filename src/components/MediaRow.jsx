import PropTypes from 'prop-types';
import {Link} from "react-router";

const MediaRow = ({item}) => {
  return (
      <tr>
        <td>
          <Link to="/single" state={item}>
            <img src={item.thumbnail} alt={item.title} />
          </Link>
        </td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td>{item.filesize}</td>
        <td>{item.media_type}</td>
        <td>{item.username}</td>
      </tr>
  );
}

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    filesize: PropTypes.number,
    media_type: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

export default MediaRow;
