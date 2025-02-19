
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  // https://vite.dev/config/
  // export default defineConfig({
  //   plugins: [react()],
  // })

  // export default defineConfig({
  //   plugins: [react()],
  //   server: {
  //     proxy: {
  //       '/api': {
  //         target: 'http://localhost:7071',
  //         changeOrigin: true,
  //         secure: false,
  //       },
  //     },
  //   },
  // });

  export default defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7071', // Ensure it's IPv4
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  });
  