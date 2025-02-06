import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { spotify } from "../apis/spotify";
import axios from "axios";
import { toaster } from "../components/ui/toaster"


const SongsContext = createContext();

function Provider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [artistsResponse, setArtistsResponse] = useState([]);
  const [songsResponse, setSongsResponse] = useState([]);
  const [topSongsResponse, setTopSongsResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchToken = () => {
    const authParameters = {
      grant_type: "client_credentials",
      client_id: spotify.CLIENT_ID,
      client_secret: spotify.CLIENT_SECRET,
    };

    axios
      .post(spotify.BASE_URL, new URLSearchParams(authParameters), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setAccessToken(response.data.access_token);
      })
      .catch((error) => {
        toaster.create({
          title: "API Error",
          description: `${error.message}`,
          type: "error",
        })
      });
  };

  async function fetchArtists(artistName) {
    if (!artistName) {
      return;
    }
    try {
      const queryParams = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      setIsLoading(true);
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
        queryParams
      );

      setArtistsResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `${error.message}`,
        type: "error",
      })
    }
  }

  async function fetchArtistSongsByName(artistName) {
    if (!artistName) {
      return;
    }
    try {
      const queryParams = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${artistName}&type=track&limit=50`,
        queryParams
      );
      setSongsResponse(response.data);
    } catch (error) {
      toaster.create({
        title: "API Error",
        description: `${error.message}`,
        type: "error",
      })
    }
  }

  async function fetchTopSongsByArtistId(artistId) {
    if (!artistId) {
      return;
    }
    try {
      const queryParams = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      setIsLoading(false);
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
        queryParams
      );
      setTopSongsResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      toaster.create({
        title: "API Error",
        description: `${error.message}`,
        type: "error",
      })
      setIsLoading(false);
    }
  }

  return (
    <SongsContext.Provider
      value={{
        fetchToken,
        fetchArtists,
        artistsResponse,
        fetchArtistSongsByName,
        songsResponse,
        isLoading,
        setArtistsResponse,
        setSongsResponse,
        fetchTopSongsByArtistId,
        topSongsResponse,
        setTopSongsResponse
      }}
    >
      {children}
    </SongsContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Provider as SongsProvider };
export default SongsContext;