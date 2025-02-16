import { Box, Text, Image} from "@chakra-ui/react";
// import { LuExternalLink } from "react-icons/lu"
import { convertMillisecondsToMinutesSeconds } from "../utils/helpers";

export const RandomizerCard = (track) => {
if (!track || !track.song) {
    return;
}
  return (
    <div className="card-font">
      <Box bg="1b1d1f">
        <Image
          src={track.song.album.images[1].url}
          alt="Album image"
        //   borderRadius="md"
          mb="3"
        />
        <Text fontSize="lg">{track.song.name}</Text>
        <Text fontSize={"xs"}>{track.song.album.name}</Text>
        <Text fontSize="sm">
          {convertMillisecondsToMinutesSeconds(track.song.duration_ms)}
        </Text> 
        {/* <Link colorPalette={"default"} href={song.song.external_urls.spotify} isExternal>
          Open in Spotify <LuExternalLink />
        </Link> */}
      </Box>
    </div>
  );
};