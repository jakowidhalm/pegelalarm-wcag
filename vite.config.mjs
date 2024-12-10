import { defineConfig } from 'vite';
import path from 'path';
import copy from 'rollup-plugin-copy';
import autoprefixer from 'autoprefixer';

let paths = {};

paths.public = 'public';
paths.bundle = paths.public + '/assets';

export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'@scss': path.resolve(__dirname, './src/scss'),
			'@js': path.resolve(__dirname, './src/js'),
		},
	},
	css: {
		postcss: {
			plugins: [autoprefixer({})],
		},
		devSourcemap: true,
	},
	plugins: [
		copy({
			targets: [],
		}),
	],
	build: {
		minify: true,
		sourcemap: true,
		target: ['es2020', 'chrome58', 'firefox57', 'safari11'],
		cssCodeSplit: false,
		rollupOptions: {
			input: 'src/main.js',
			output: {
				dir: paths.bundle,
				entryFileNames: 'script.min.js',
				format: 'es',
				assetFileNames: (file) => {
					if (file.name === 'style.css') return 'style.min.css';
					return 'assets/[name].[ext]';
				},
			},
		},
	},
});
