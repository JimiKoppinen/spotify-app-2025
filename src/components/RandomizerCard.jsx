import { Box, Text, Image} from "@chakra-ui/react";
import { convertMillisecondsToMinutesSeconds } from "../utils/helpers";

export const RandomizerCard = ({track, onClick}) => {
if (!track) {
    return;
}
  return (
    <div className="card-font">
      <Box onClick={onClick} cursor="pointer" bg="1b1d1f">
        <Image
          src={track.album.images[1].url}
          alt="Album image"
          mb="3"
        />
        <Text fontSize="lg">{track.name}</Text>
        <Text fontSize={"xs"}>{track.album.name}</Text>
        <Text fontSize="sm">
          {convertMillisecondsToMinutesSeconds(track.duration_ms)}
        </Text> 
      </Box>
    </div>
  );
};