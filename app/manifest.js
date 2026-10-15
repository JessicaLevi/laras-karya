export default function manifest() {
  return {
    name: "Laras Karya - Karier Hijau untuk Perempuan",
    short_name: "Laras Karya",
    description: "Platform karier hijau untuk perempuan Indonesia.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f8faf8",
    theme_color: "#055c45",
    lang: "id",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
