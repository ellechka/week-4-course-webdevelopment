import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import useForm from "../hooks/formHooks.js";
import {useFile, useMedia} from "../hooks/apiHooks.js";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const previewUrlRef = useRef("");
  const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const token = localStorage.getItem("token");

  const doUpload = async (inputs) => {
    setError("");

    try {
      if (!file || !token) {
        throw new Error("Choose a file and sign in before uploading.");
      }

      const fileData = await postFile(file, token);
      await postMedia(fileData, inputs, token, file);
      navigate("/");
    } catch (uploadError) {
      setError(uploadError.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doUpload, {
    title: "",
    description: "",
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] ?? null;
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    previewUrlRef.current = selectedFile ? URL.createObjectURL(selectedFile) : "";
    setPreviewUrl(previewUrlRef.current);
    setFile(selectedFile);
  };

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  return (
    <section className="upload-card">
      <h1>Upload</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <img
          className="upload-preview"
          src={previewUrl || "https://placehold.co/200?text=Choose+image"}
          alt="Selected file preview"
          width="200"
        />
        {error && <p className="upload-error" role="alert">{error}</p>}
        <button
          type="submit"
          disabled={!file || inputs.title.trim().length <= 3}
        >
          Upload
        </button>
      </form>
    </section>
  );
};

export default Upload;
