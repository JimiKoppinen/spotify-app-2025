import { Box, Text, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { convertMillisecondsToMinutesSeconds } from "../utils/helpers";

export const RandomizerCard = ({ track, onClick }) => {
  if (!track) {
    return;
  }
  return (
    <div>
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

RandomizerCard.propTypes = {
  track: PropTypes.shape({
    album: PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    duration_ms: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};