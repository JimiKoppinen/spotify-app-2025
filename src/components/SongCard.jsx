import { Box, Text, Image} from "@chakra-ui/react";
// import { LuExternalLink } from "react-icons/lu"
import { convertMillisecondsToMinutesSeconds } from "../utils/helpers";

export const SongCard = (song) => {
  return (
    <div className="card-font">
      <Box bg="1b1d1f">
        <Image
          src={song.song.album.images[1].url}
          alt="Album image"
          borderRadius="md"
          mb="3"
        />
        <Text fontSize="lg">{song.song.name}</Text>
        <Text fontSize={"xs"}>{song.song.album.name}</Text>
        <Text fontSize="sm">
          {convertMillisecondsToMinutesSeconds(song.song.duration_ms)}
        </Text>
        {/* <Link colorPalette={"default"} href={song.song.external_urls.spotify} isExternal>
          Open in Spotify <LuExternalLink />
        </Link> */}
      </Box>
    </div>
  );
};