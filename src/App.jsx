import { useState, useEffect } from "react";
import { Flex, Container, Heading, Button, Text } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/NavBar";
import ArtistSearchContainer from "./views/ArtistSearchContainer";
import ArtistList from "./components/ArtistList";
import { SongRandomizer } from "./components/SongRandomizer";

function App() {
  const [user, setUser] = useState(null);

  // Fetch user authentication details from Azure
  useEffect(() => {
    fetch("/.auth/me") // Azure authentication endpoint
      .then((res) => res.json())
      .then((data) => {
        setUser(data.clientPrincipal || null);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <>
      <div className="backdrop">
        <div className="background-image"></div>
      </div>
      <div className="content">
        <Router>
          <Nav />
          <Container>
            <Flex align="center" direction="column">
              <Heading as="h1" size="5xl">
                API Test Application
              </Heading>

              {/* Show Login/Logout button */}
              {user ? (
                <>
                  <Text>Welcome, {user.userDetails}!</Text>
                  <Button colorScheme="red" onClick={() => (window.location.href = "/.auth/logout")}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button colorScheme="blue" onClick={() => (window.location.href = "/.auth/login/google")}>
                  Login with Google
                </Button>
              )}

              {/* Routes */}
              {user ? (
                <Routes>
                  <Route path="/ArtistSearchContainer" element={<ArtistSearchContainer />} />
                  <Route path="/ArtistList" element={<ArtistList />} />
                  <Route path="/RehearsalList" element={<SongRandomizer />} />
                </Routes>
              ) : (
                <Text mt={5}>Please log in to access the application.</Text>
              )}
            </Flex>
          </Container>
        </Router>
      </div>
    </>
  );
}

export default App;
