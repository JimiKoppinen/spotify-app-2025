// const axios = require('axios');

// async function fetchArtists(artistName, accessToken) {
//   if (!artistName) {
//     throw new Error("Artist name is required");
//   }

//   try {
//     const queryParams = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     };

//     const response = await axios.get(
//       `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
//       queryParams
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching artists:", error);
//     throw new Error("Failed to fetch artists");
//   }
// }

// // Export using CommonJS syntax
// module.exports = fetchArtists;

const { app } = require('@azure/functions');
const axios = require('axios');

app.http('fetchArtists', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const artistName = request.query.get('artistName');
        const accessToken = request.query.get('accessToken');


        if (!artistName) {
            return { status: 400, body: 'Artist name is required' };
        }

        if (!accessToken) {
          return { status: 400, body: 'Acces Token is required' };
      }

        try {
            const queryParams = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
                queryParams
            );

            return { status: 200, body: JSON.stringify(response.data) };
        } catch (error) {
            console.error('Error fetching artists:', error);
            return { status: 500, body: 'Failed to fetch artists' };
        }
    }
});
