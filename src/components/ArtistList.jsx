import { Box, Button, Heading, Grid, Image, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import SongsContext from "../context/songs";

const ArtistList = () => {
  const { selectedArtist, setSelectedArtist, artistsResponse } = useContext(SongsContext);

  const onArtistSelect = (artist) => {
    setSelectedArtist(artist);
  };

  if (!artistsResponse.artists || selectedArtist) {
    return null;
  }

  return (
    <Box mt={5} p={4}>
      <Heading color="white" size="xl" mb={5} textAlign="center">
        Select an Artist
      </Heading>
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
        {artistsResponse.artists.items.map((artist) => (
          <Box
            key={artist.id}
            p={4}
            bg="gray.700"
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
            _hover={{ bg: "gray.600", cursor: "pointer", transform: "scale(1.05)" }}
            transition="0.2s ease-in-out"
            onClick={() => onArtistSelect(artist)}
          >
            <VStack>
              <Image
                src={artist.images?.[0]?.url}
                alt={artist.name}
                boxSize="100px"
                borderRadius="full"
                objectFit="cover"
              />
              <Text fontSize="lg" fontWeight="bold" color="white">
                {artist.name}
              </Text>
              <Button size="sm" colorScheme="blue">
                Select
              </Button>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ArtistList;
