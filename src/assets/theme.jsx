// // import { extendTheme } from "@chakra-ui/react";

// // const theme = extendTheme({
// //   colors: {
// //     brand: {
// //       100: "#f7fafc",
// //       // ...
// //       900: "#1a202c",
// //     },
// //     // fonts: {
// //     //   heading: `'Gobold', sans-serif`,
// //     //   body: `'Gobold', sans-serif`,
// //     // },
// //   },
// // });

// // export default theme;

// import { createSystem, defaultConfig } from "@chakra-ui/react"

// export const system = createSystem(defaultConfig, {
//   theme: {
//     tokens: {
//       fonts: {
//         heading: { value: `'Gobold', sans-serif` },
//         body: { value: `'Gobold', sans-serif` },
//       },
//     },
//   },
// })
import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Figtree', sans-serif" },
        body: { value: "'Figtree', sans-serif" },
      },
    },
  },
});