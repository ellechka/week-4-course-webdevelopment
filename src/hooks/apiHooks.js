import {useCallback, useEffect, useState} from "react";

const MEDIA_API_URL = import.meta.env.VITE_MEDIA_API;
const AUTH_API_URL = import.meta.env.VITE_AUTH_API;

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(AUTH_API_URL + '/auth/login', fetchOptions);
    return loginResult;
  }

  return {postLogin};
}

const useUser = () => {
  const getUserByToken = useCallback(async (token) => {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return fetchData(`${AUTH_API_URL}/users/token`, fetchOptions);
  }, []);

  const postUser = async (userData) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    return fetchData(`${AUTH_API_URL}/users`, fetchOptions);
  };

  return {getUserByToken, postUser};
};

const useMedia = () => {

  const [mediaArray, setMediaArray] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const mediaResponse = await fetch(`${MEDIA_API_URL}/media`);
        if (!mediaResponse.ok) {
          throw new Error('Not possible to upload the media');
        }

        const media = await mediaResponse.json();

        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const userResponse = await fetch(
              `${AUTH_API_URL}/users/${item.user_id}`,
            );
            if (!userResponse.ok) {
              throw new Error(`Not possible to upload the user ${item}`);
            }

            const user = await userResponse.json();
            return { ...item, username: user.username };
          }),
        );

        setMediaArray(mediaWithUsers);
      } catch (error) {
        setError(error.message);
      }
    };
    loadMedia();
  }, []);

  return {mediaArray, error};
};

export { useMedia, useAuthentication, useUser };
