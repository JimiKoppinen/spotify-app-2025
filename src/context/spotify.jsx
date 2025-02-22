import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toaster } from "../components/ui/toaster";

const SpotifyContext = createContext();

function Provider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [artistsResponse, setArtistsResponse] = useState([]);
  const [songsResponse, setSongsResponse] = useState([]);
  const [artistAlbumsResponse, setArtistAlbumsResponse] = useState([]);
  const [albumTracksResponse, setAlbumTracksResponse] = useState([]);
  const [multipleAlbumTracksResponse, setMultipleAlbumTracksResponse] = useState([]);
  const [trackResponse, setTrackResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const clearState = () => {
    setArtistsResponse([]);
    setSongsResponse([]);
    setArtistAlbumsResponse([]);
    setAlbumTracksResponse([]);
    setMultipleAlbumTracksResponse([]);
    setTrackResponse(null);
    setSelectedArtist(null);
  };

  const fetchData = async (url, setState) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setIsLoading(false);
      setState(response.data);
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
    }
  }

  const fetchToken = async () => {
    await fetchData('/api/fetchToken', setAccessToken);
  };

  const fetchArtists = async (artistName) => {
    if (!artistName) {
      toaster.create({
        title: "Enter Artist Name",
        description: `Enter artist name to search`,
        type: "warning",
      });
      return;
    }
    await fetchData(`/api/fetchArtists?artistName=${artistName}&accessToken=${accessToken}`, setArtistsResponse);
  };

  const fetchArtistAlbums = async (artistId) => {
    if (!artistId) {
      return;
    }
    await fetchData(`/api/fetchArtistAlbums?artistId=${artistId}&accessToken=${accessToken}`, setArtistAlbumsResponse);
  };

  async function fetchAlbumTracks(albumId) {
    if (!albumId) {
      return;
    }
    try {
      const response = await axios.get(`/api/fetchAlbumTracks?albumId=${albumId}&accessToken=${accessToken}`);
      setAlbumTracksResponse(response.data);
      return response.data || [];
    } catch (error) {
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
    } catch (error) {
      setIsLoading(false);
      toaster.create({
        title: "API Error",
        description: `Status: ${error.response.status} Reason: ${error.response.data} ${error.response.statusText}`,
        type: "error",
      });
    }
    finally {
      toaster.create({
        title: "Tracks Fetched",
        description: `All tracks fetched successfully`,
        type: "success",
      });
      setIsLoading(false);
    }
  }

  const fetchTrack = async (trackId) => {
    if (!trackId) {
      return;
    }
    await fetchData(`/api/fetchTrack?trackId=${trackId}&accessToken=${accessToken}`, setTrackResponse);
  };

  return (
    <SpotifyContext.Provider
      value={{
        fetchToken,
        fetchArtists,
        artistsResponse,
        songsResponse,
        isLoading,
        setArtistsResponse,
        setSongsResponse,
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
    </SpotifyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Provider as SpotifyProvider };
export default SpotifyContext;
