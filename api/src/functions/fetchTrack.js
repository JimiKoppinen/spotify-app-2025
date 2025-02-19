const { app } = require("@azure/functions");
const axios = require("axios");

app.http("fetchTrack", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const trackId = request.query.get("trackId");
    const accessToken = request.query.get("accessToken");
    if (!trackId) {
      return { status: 400, body: "Track ID is required" };
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
        `https://api.spotify.com/v1/tracks/${trackId}`,
        queryParams
      );

      return { status: 200, body: JSON.stringify(response.data) };
    } catch (error) {
      console.error("Error fetching track:", error);
      return { status: 500, body: "Failed to fetch track" };
    }
  },
});
