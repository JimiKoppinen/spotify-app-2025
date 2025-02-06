import { Container } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import ArtistList from "../components/ArtistList";
import { SongList } from "../components/SongList";

export const ArtistSearchContainer = () => {
  return (
    <>
      <SearchBar />
      <ArtistList />
      <Container maxW="container.lg">
        <SongList />
      </Container>
    </>
  );
};