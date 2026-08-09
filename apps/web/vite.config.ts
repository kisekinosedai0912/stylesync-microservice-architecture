/// <reference types='vitest' />
import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, __dirname, "");
	const apiProxyTarget =
		env.VITE_API_PROXY_TARGET || "http://localhost:4000";
	const apiProxy = {
		"/api": {
			target: apiProxyTarget,
			changeOrigin: true,
			secure: false,
		},
	};

	return {
		root: __dirname,
		cacheDir: "../../node_modules/.vite/apps/shop",
		server: {
			port: 4200,
			host: "localhost",
			proxy: apiProxy,
		},
		preview: {
			port: 4200,
			host: "localhost",
			proxy: apiProxy,
		},
		plugins: [react(), nxViteTsPaths(), tailwindcss()] as PluginOption[],
		resolve: {
			dedupe: ["react", "react-dom"],
		},
		// Uncomment this if you are using workers.
		// worker: {
		//  plugins: [ nxViteTsPaths() ],
		// },
		build: {
			outDir: "./dist",
			emptyOutDir: true,
			reportCompressedSize: true,
			commonjsOptions: {
				transformMixedEsModules: true,
			},
		},
		test: {
			name: "@org/shop",
			watch: false,
			globals: true,
			environment: "jsdom",
			setupFiles: ["./src/test-setup.ts"],
			include: [
				"{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
			],
			reporters: ["default"],
			coverage: {
				reportsDirectory: "./test-output/vitest/coverage",
				provider: "v8" as const,
				include: ["src/**/*.{ts,tsx}"],
			},
		},
	};
});
