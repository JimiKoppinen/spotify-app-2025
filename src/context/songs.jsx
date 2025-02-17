import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toaster } from "../components/ui/toaster";

const SongsContext = createContext();

function Provider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [artistsResponse, setArtistsResponse] = useState([]);
  const [songsResponse, setSongsResponse] = useState([]);
  const [topSongsResponse, setTopSongsResponse] = useState([]);
  const [artistAlbumsResponse, setArtistAlbumsResponse] = useState([]);
  const [albumTracksResponse, setAlbumTracksResponse] = useState([]);
  const [multipleAlbumTracksResponse, setMultipleAlbumTracksResponse] = useState([]);
  const [trackResponse, setTrackResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);


  const clearState = () => {
    setArtistsResponse([]);
    setSongsResponse([]);
    setTopSongsResponse([]);
    setArtistAlbumsResponse([]);
    setAlbumTracksResponse([]);
    setMultipleAlbumTracksResponse([]);
    setTrackResponse(null);
    setSelectedArtist(null);
  };

  const fetchToken = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/fetchToken");
      setAccessToken(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
    }
  };


  async function fetchArtists(artistName) {
    if (!artistName) {
      toaster.create({
        title: "Enter Artist Name",
        description: `Enter artist name to search`,
        type: "warning",
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/fetchArtists?artistName=${artistName}&accessToken=${accessToken}`);
      setArtistsResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
    }
  }

  // Fetch artist songs by name via the Azure Function
  async function fetchArtistSongsByName(artistName) {
    if (!artistName) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/fetchArtistSongs?artistName=${artistName}&accessToken=${accessToken}`);
      setSongsResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
    }
  }

  // Fetch top songs by artist ID via the Azure Function
  async function fetchTopSongsByArtistId(artistId) {
    if (!artistId) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/fetchTopTracks?artistId=${artistId}&accessToken=${accessToken}`);
      setTopSongsResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
    }
  }

  async function fetchArtistAlbums(artistId) {
    if (!artistId) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/fetchArtistAlbums?artistId=${artistId}&accessToken=${accessToken}`);
      setArtistAlbumsResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
    }
  }

  async function fetchAlbumTracks(albumId) {
    if (!albumId) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/fetchAlbumTracks?albumId=${albumId}&accessToken=${accessToken}`);
      setAlbumTracksResponse(response.data);
      setIsLoading(false);
      return response.data || [];
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
    }
  }

  async function fetchMultipleAlbumTracks(albumIds) {
    if (!albumIds) {
      return;
    }
    try {
      setIsLoading(true);
      const albumTracks = await Promise.all(albumIds.map(async (albumId) => {
        return await fetchAlbumTracks(albumId);
      }));
      setMultipleAlbumTracksResponse(albumTracks);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
    }
  }

  async function fetchTrack(trackId) {
    if (!trackId) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/fetchTrack?trackId=${trackId}&accessToken=${accessToken}`);
      setTrackResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
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
        setTopSongsResponse,
        fetchArtistAlbums,
        artistAlbumsResponse,
        fetchAlbumTracks,
        albumTracksResponse,
        fetchTrack,
        trackResponse,
        fetchMultipleAlbumTracks,
        multipleAlbumTracksResponse,
        setSelectedArtist,
        selectedArtist,
        accessToken,
        clearState,
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
