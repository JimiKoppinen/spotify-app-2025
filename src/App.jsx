import { Flex, Container, Heading } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Toaster } from "./components/ui/toaster"
import { ArtistSearchContainer } from "./views/ArtistSearchContainer";
import Nav from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SongsContext from "./context/songs";
import { ArtistControl } from "./components/ArtistControl";
import { SpinnerBar } from "./components/SpinnerBar";

function App() {
  const { fetchToken, isLoading } = useContext(SongsContext);

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
        <Router>
          <Nav />
          <Container
          // maxW="container.lg"
          >
            {isLoading && <SpinnerBar />}
            <ArtistControl />
            <Flex align="center" direction="column">
              <Heading as="h1" size="5xl" mb={4} >
                Spotify Song Randomizer
              </Heading>
              <Routes>
                <Route path="/" element={<ArtistSearchContainer />} />
                {/* <Route path="/ArtistSearchContainer" element={<ArtistSearchContainer />} /> */}
                {/* <Route path="/ArtistList" element={<ArtistList />} />
                <Route path="/SongRandomizer" element={<SongRandomizer />} /> */}
              </Routes>
            </Flex>
          </Container>
        </Router>
      </div>
    </>
  );
}

export default App
