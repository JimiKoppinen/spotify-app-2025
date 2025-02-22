import { Flex, Container, Heading } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Toaster } from "./components/ui/toaster"
import { ArtistSearchContainer } from "./views/ArtistSearchContainer";
import SpotifyContext from "./context/spotify";
import { ArtistControl } from "./components/ArtistControl";
import { SpinnerBar } from "./components/Spinner";

function App() {
  const { fetchToken, isLoading } = useContext(SpotifyContext);

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <>
      <div className="backdrop">
        <div className="background-image"></div>
      </div>
      <div className="content">
        <Toaster />
        <Container marginTop={4} maxW="container.lg">
          {isLoading && <SpinnerBar />}
          <ArtistControl />
          <Flex align="center" direction="column">
            <Heading as="h1" size="3xl" mb={4} >
              Spotify Song Randomizer
            </Heading>
            <ArtistSearchContainer />
          </Flex>
        </Container>
      </div>
    </>
  );
}

export default App
