import { Input, Button, Field, } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import SongsContext from "../context/songs";

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const { fetchToken, fetchArtists, selectedArtist, accessToken } = useContext(SongsContext);

    useEffect(() => {
        if (!accessToken) {
            fetchToken();
        }
    }, [accessToken]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleOnSearch = () => {
        fetchArtists(searchInput).then(() => {
            setSearchInput("");
        });
    };

    if (selectedArtist || !accessToken) {
        return null;
    }
    return (
        <div>
            <Field.Root>
                <Field.Label>
                    Search for an artist from Spotify
                </Field.Label>
                <Input
                    onChange={handleInputChange}
                    value={searchInput}
                    backgroundColor="#f8f8f8"
                    color="#1c1e21"
                    colorPalette={"orange"}
                    className="searchInput"
                    mb="4"
                    placeholder="Type in artist"
                />
                <Button
                    onClick={handleOnSearch}
                    backgroundColor="#f8f8f8"
                    color="#1c1e21"
                    colorPalette={"orange"}
                    size="lg"
                >
                    Search
                </Button>
            </Field.Root>
        </div>
    );
};

export default SearchBar;