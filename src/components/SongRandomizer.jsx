import { Text, Button } from "@chakra-ui/react"
import { useState, useEffect, useContext } from 'react';
import SongsContext from "../context/songs";
import { RandomizerCard } from "./RandomizerCard";

export const SongRandomizer = () => {
  const [tracksData, setTracksData] = useState(null);
  const {
    isLoading,
    fetchToken,
    fetchTrack,
    trackResponse,
    artistAlbumsResponse,
    fetchArtistAlbums,
    fetchMultipleAlbumTracks,
    multipleAlbumTracksResponse,
    selectedArtist,
    accessToken,
  } = useContext(SongsContext);

  useEffect(() => {
    if (!accessToken) {
      fetchToken();
    }
  }, []);

  useEffect(() => {
    if (accessToken && selectedArtist && !artistAlbumsResponse?.items) {
      fetchArtistAlbums(selectedArtist.id);
    }
  }, [accessToken, selectedArtist, artistAlbumsResponse]);

  useEffect(() => {
    if (artistAlbumsResponse?.items && multipleAlbumTracksResponse.length === 0) {
      fetchTracksForAlbums(artistAlbumsResponse.items);
    }
  }, [artistAlbumsResponse, multipleAlbumTracksResponse]);

  useEffect(() => {
    if (multipleAlbumTracksResponse) {
      const filteredTracks = multipleAlbumTracksResponse.filter((tracks) => tracks !== undefined && tracks !== null);
      setTracksData(filteredTracks);

      if (filteredTracks.length > 0) {
        assignRandomTrack(filteredTracks, (track) => fetchTrack(track.id));
      }
    }
  }, [multipleAlbumTracksResponse]);

  const onRandomizeClick = () => {
    assignRandomTrack(tracksData, (track) => fetchTrack(track.id));
  };

  const fetchTracksForAlbums = async (albums) => {
    const AlbumIds = extractAlbumIds(albums);
    await fetchMultipleAlbumTracks(AlbumIds);
  };

  const assignRandomTrack = (albumTracks, callback) => {
    const randomAlbumIndex = Math.floor(Math.random() * albumTracks.length);
    const randomTrackIndex = Math.floor(Math.random() * albumTracks[randomAlbumIndex].items.length);
    const randomTrack = albumTracks[randomAlbumIndex].items[randomTrackIndex];
    callback?.(randomTrack);
  }

  const extractAlbumIds = (listOfAlbums) => listOfAlbums.map(album => album.id)

  if (!selectedArtist) {
    return;
  }

  return (
    tracksData && multipleAlbumTracksResponse &&
    <>
      {!isLoading && <Button onClick={() => onRandomizeClick()}>
        <Text>Randomize</Text>
      </Button>
      }
      <RandomizerCard track={trackResponse} onClick={onRandomizeClick} />
    </>
  )
}                                                                      