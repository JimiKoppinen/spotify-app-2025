const { app } = require("@azure/functions");
const axios = require("axios");

app.http("fetchAlbumTracks", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const albumId = request.query.get("albumId");
    const accessToken = request.query.get("accessToken");

    if (!albumId) {
      return { status: 400, body: "Album ID is required" };
    }

    if (!accessToken) {
      return { status: 400, body: "Access token is required" };
    }

    try {
      const queryParams = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/albums/${albumId}/tracks`,
        queryParams
      );

      return { status: 200, body: JSON.stringify(response.data) };
    } catch (error) {
      console.error("Error fetching album tracks:", error);
      return { status: 500, body: "Failed to fetch album tracks" };
    }
  },
});
