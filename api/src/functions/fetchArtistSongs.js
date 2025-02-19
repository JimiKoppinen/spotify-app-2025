const axios = require('axios');

async function fetchArtistSongs(artistName, accessToken) {
  if (!artistName) {
    throw new Error("Artist name is required");
  }

  try {
    const queryParams = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${artistName}&type=track&limit=50`,
      queryParams
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw new Error("Failed to fetch songs");
  }
}

module.exports = fetchArtistSongs;
