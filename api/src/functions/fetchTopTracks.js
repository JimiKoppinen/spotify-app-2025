// const axios = require('axios');


// async function fetchTopTracks(artistId, accessToken) {
//   if (!artistId) {
//     throw new Error("Artist ID is required");
//   }

//   try {
//     const queryParams = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     };

//     const response = await axios.get(
//       `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
//       queryParams
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching top tracks:", error);
//     throw new Error("Failed to fetch top tracks");
//   }
// }

// module.exports = fetchTopTracks;


const { app } = require('@azure/functions');
const axios = require('axios');

app.http('fetchTopTracks', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const artistId = request.query.get('artistId');
    const accessToken = request.query.get('accessToken');

    if (!artistId) {
      return { status: 400, body: 'Artist ID is required' };
    }

    if (!accessToken) {
      return { status: 400, body: 'Access token is required' };
    }

    try {
      const queryParams = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
        queryParams
      );

      return { status: 200, body: JSON.stringify(response.data)};
      
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      return { status: 500, body: 'Failed to fetch top tracks' };
    }
  }
});