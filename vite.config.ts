import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.GITHUB_PAGES ? "must-clipper" : "./",
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.png"],
			injectRegister: "auto",
			manifest: {
				name: "ますとくりっぱー",
				short_name: "ますとくりっぱー",
				description: "YouTube・Twitch用配信まとめツール",
				theme_color: "#5eead4",
				start_url: "https://must-clipper.takusea.com",
				icons: [
					{
						src: "icon-128.png",
						sizes: "128x128",
						type: "image/png",
					},
					{
						src: "icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icon-512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
				share_target: {
					action: "/share-target/",
					method: "GET",
					enctype: "application/x-www-form-urlencoded",
					params: {
						title: "title",
						text: "text",
						url: "url",
					},
				},
			},
		}),
	],
});
