import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// import env from './.env.development'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: "localhost", //使用当前的IP地址，没有这个就是以localhost作为本地地址
    port: 3000, //端口号为3000
    open: true, //是否在默认浏览器中自动打开该地址
    origin: 'http://127.0.0.1:10119/client/v1/'
    //   proxy: {
    //     //使用代理
    //     "/api": {
    //       //当有 /api开头的地址是，代理到target地址
    //       target: "http://127.0.0.1:10119/client/v1/", // 需要跨域代理的本地路径
    //       changeOrigin: true, //是否改变请求源头
    //       rewrite: (path) => path.replace(/^\/api/, ""), // 路径重写
    //     },
    //   },
  },
  resolve: {
    alias: [{ find: /^~/, replacement: "" }],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
// export default defineConfig(({ command, mode }) => {
//   console.log("mode: ", mode);
//   console.log("command:11111 ", command);
//   const env = loadEnv(mode, __dirname);
//   // const {} = fetchEnv
//   if (command == "serve") {
//     return {
//       plugins: [react()],
//       server: {
//         host: "localhost",
//         port: 3000,
//         open: true,
//       },
//       resolve: {
//         alias: [{ find: /^~/, replacement: "" }],
//       },
//       css: {
//         preprocessorOptions: {
//           less: {
//             javascriptEnabled: true,
//           },
//         },
//       },
//     };
//   } else {
//     return {
//       plugins: [react()],
//       base: "./",
//       resolve: {
//         alias: [{ find: /^~/, replacement: "" }],
//       },
//       css: {
//         preprocessorOptions: {
//           less: {
//             javascriptEnabled: true,
//           },
//         },
//       },
//     };
//   }
// });
