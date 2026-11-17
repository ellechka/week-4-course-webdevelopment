const SingleView = (props) => {
  const {item, setSelectedItem} = props;

  return (
    <dialog open={Boolean(item)} className="single-view">
      <div className="single-view__content">
        <button type="button" onClick={() => setSelectedItem(null)}>✕</button>
        <h2>{item.title}</h2>
        <p>{item.description}</p>

        {item.media_type.startsWith('image/') ? (
          <img src={item.filename} alt={item.title} />
        ) : item.media_type.startsWith('video/') ? (
          <video src={item.filename} control />
        ) : null}
      </div>
    </dialog>
  );

};

export default SingleView;
