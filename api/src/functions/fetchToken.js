// const axios = require('axios');

// async function fetchToken() {
//     const asdf = 'asdf';
// const asdfasd = 'asdf';
//   const authParameters = {
//     grant_type: "client_credentials",
//     // client_id: process.env.SPOTIFY_CLIENT_ID,
//     // client_secret: process.env.SPOTIFY_CLIENT_SECRET,
//     client_id: asdf,
//     client_secret: asdfasd,
//   };

//   try {
//     const response = await axios.post(
//       'https://accounts.spotify.com/api/token',
//       new URLSearchParams(authParameters),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error fetching token:', error);
//     throw new Error('Failed to fetch token');
//   }
// }

// module.exports = fetchToken;

const { app } = require('@azure/functions');
const axios = require('axios');

app.http('fetchToken', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID;
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
            const authParameters = {
                grant_type: "client_credentials",
                client_id: clientId,
                client_secret: clientSecret,
            };

            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                new URLSearchParams(authParameters),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            return { body: response.data.access_token };
        } catch (error) {
            console.error('Error fetching token:', error);
            return { status: 500, body: 'Failed to fetch token' };
        }
    }
});