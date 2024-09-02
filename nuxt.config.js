import { repositoryName, apiEndpoint } from "./slicemachine.config.json";
import { createClient } from "@prismicio/client";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },
  app: {
    //baseURL: "/action-days", //process.env.NODE_ENV === 'production' ? '/WIP/action-days/' : undefined,
    baseURL: "/",
    head: {
      title: "UN SOTF Action Days",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  tailwindcss: {
    cssPath: ["~/assets/css/main.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
  },
  script: [
    {
      src: "https://static.cdn.prismic.io/prismic.js?new=true&repo=action-datys",
    },
  ],
  modules: ["@nuxtjs/prismic", "@nuxtjs/tailwindcss"],
  prismic: {
    endpoint: apiEndpoint || repositoryName,
    preview: "/api/preview",
    clientConfig: {
      routes: [
        // {
        // 	type: "page",
        // 	path: "/:uid",
        // },
        {
          type: "page",
          uid: "home",
          path: "/",
        },
        {
          type: "page",
          uid: "action-days",
          path: "/action-days",
        },
        {
          type: "page",
          uid: "register",
          path: "/action-days/register",
        },
        {
          type: "page",
          path: "/action-days/event/:uid/",
        },
      ],
    },
  },
  hooks: {
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) {
        return;
      }
      let routes = [
        "/",
        "/action-days/register",
        "/action-days/event/youthlead",
        "/action-days/event/digital-futures",
        "/action-days/event/peace",
        "/action-days/event/sust-dev",
        "/action-days/event/friday-closing",
        "/action-days/event/saturday-closing",
        "/action-days/event/friday-side-events",
        "/action-days/event/saturday-side-events",
        "/action-days/event/saturday-opening",
        "/action-days/event/friday-opening",
        "/action-days/event/dialogue-with-sg",
      ];
      const { createClient } = await import("@prismicio/client");
      const client = createClient("https://action-datys.cdn.prismic.io/api/v2");
      nitroConfig.prerender?.routes?.push(...routes);
    },
  },
  plugins: ["~/plugins/lenis.js"],
});
