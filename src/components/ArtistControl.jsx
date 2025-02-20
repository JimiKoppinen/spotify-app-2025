import SongsContext from "../context/songs";
import { useContext } from 'react';
import { Box, CloseButton, HStack, Text, } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";



export const ArtistControl = () => {
    const { selectedArtist, clearState } = useContext(SongsContext);

    const onArtistClear = () => {
        clearState();
        toaster.create({
            title: "Artist Cleared",
            description: "Artist cleared successfully",
            type: "success",
        });
    };

    if (!selectedArtist) {
        return null;
    }
    return (
        <Box marginTop={4}>
            <Text fontSize={"xs"}>Active artist:</Text>
            <HStack>
                <Text fontSize={"lg"}>{selectedArtist.name}</Text>
                <CloseButton onClick={() => onArtistClear()} variant={"solid"} colorPalette={"gray"} />
            </HStack>
        </Box>
    );
}