import { Container } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import ArtistList from "../components/ArtistList";
import { SongRandomizer } from "../components/SongRandomizer";

export const ArtistSearchContainer = () => {
  return (
    <>
      <SearchBar />
      <ArtistList />
      <SongRandomizer />
      <Container maxW="container.lg">
      </Container>
    </>
  );
};