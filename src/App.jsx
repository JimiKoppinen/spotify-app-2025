import { Flex, Container, Heading } from "@chakra-ui/react";
import { ArtistSearchContainer } from "./views/ArtistSearchContainer";
import Nav from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArtistList from "./components/ArtistList";
import { SongRandomizer } from "./components/SongRandomizer";

function App() {
  return (
    <>
      <div className="backdrop">
        <div className="background-image"></div>
      </div>
      <div className="content">
        <Router>
          <Nav />
          <Container 
          // maxW="container.lg"
          >
            <Flex align="center" direction="column">
              <Heading as="h1" size="5xl">
                API test application
              </Heading>
              <Routes>
                <Route path="/ArtistSearchContainer" element={<ArtistSearchContainer />} />
                <Route path="/ArtistList" element={<ArtistList />} />
                <Route path="/RehearsalList" element={<SongRandomizer/>} />
              </Routes>
            </Flex>
          </Container>
        </Router>
      </div>
    </>
  );
}

export default App
