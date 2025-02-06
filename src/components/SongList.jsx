import { Grid, GridItem } from "@chakra-ui/react";
import { useContext } from "react";
import SongsContext from "../context/songs";
import { SongCard } from "./SongCard";

export const SongList = () => {
  const { topSongsResponse } = useContext(SongsContext);

  if (!topSongsResponse.tracks) {
    return null;
  }
  return (  
    <Grid mt="4" templateColumns="repeat(5, 1fr)" gap={6}>
      {topSongsResponse.tracks.map((song, index) => (
        <GridItem key={index} m={(5, 5, 10, 5)} w="100" h="200">
          <SongCard song={song} />
        </GridItem>
      ))}
    </Grid>
  );
};