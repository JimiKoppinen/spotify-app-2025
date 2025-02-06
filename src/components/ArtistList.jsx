import { Button, Heading, Spinner, GridItem, Grid } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import SongsContext from "../context/songs";

const ArtistList = () => {
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const { artistsResponse, fetchTopSongsByArtistId, isLoading, setArtistsResponse, setTopSongsResponse } = useContext(SongsContext);

  useEffect(() => {
    if (selectedArtistId !== "") {
      fetchTopSongsByArtistId(selectedArtistId);
    }
  }, [selectedArtistId]);

  const onArtistSelect = (artistId) => {
    setSelectedArtistId(artistId);
  };

  const onEmptyList = () => {
    setArtistsResponse([]);
    setTopSongsResponse([]);
  }

  if (isLoading) {
    return <Spinner />;
  }
  if (!artistsResponse.artists) {
    return <></>;
  }
  return (
    <>
      <Heading color="white" size="2xl" marginTop={5} marginBottom={5}>
        Artist list
      </Heading>
      <Button onClick={() => onEmptyList()} colorPalette="red" marginBottom={5}>
        X Empty list
      </Button>

        {artistsResponse.artists.items.map((item, index) => (
      <Grid templateColumns="repeat(6, 1fr)" gap="6" key={index}>
          <GridItem colSpan={4}>
            {item.name}
            </GridItem>
            <GridItem colSpan={1}>
            <Button
              onClick={() => onArtistSelect(item.id)}
            >
              Choose
            </Button>
            </GridItem>
      </Grid>

        ))}

    </>
  );
};

export default ArtistList;