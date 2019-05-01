import { options } from "../build.options";

const root = {
	src: options.root.src || "./src",
	dist: options.root.dist || "./dist",
};

const bsyncConfig = {
	server: root.dist,
	notify: true,
	...options.browserSync,
};

const paths = {
	views: {
		src: [`${root.src}/views/pages/*.njk`],
		dist: root.dist,
		watch: [`${root.src}/components/**/*.njk`, `${root.src}/views/**/*.njk`],
	},
	styles: {
		src: `${root.src}/sass/main.scss`,
		dist: `${root.dist}/assets/css/`,
		watch: [`${root.src}/components/**/*.scss`, `${root.src}/sass/**/*.scss`],
	},
	scripts: {
		src: `${root.src}/js/index.js`,
		dist: `${root.dist}/assets/js/`,
		watch: [`${root.src}/components/**/*.js`, `${root.src}/js/**/*.js`],
	},
	images: {
		src: [
			`${root.src}/img/**/*.{jpg,jpeg,png,gif,svg}`,
			`!${root.src}/img/svg/*.svg`,
			`!${root.src}/img/favicon.{jpg,jpeg,png,gif,svg}`,
		],
		dist: `${root.dist}/assets/img/`,
		watch: [
			`${root.src}/img/**/*.{jpg,jpeg,png,gif,svg}`,
			`!${root.src}/img/svg/*.svg`,
			`!${root.src}/img/favicon.{jpg,jpeg,png,gif,svg}`,
		],
	},
	webp: {
		src: `${root.src}/img/**/*_webp.{jpg,jpeg,png}`,
		dist: `${root.dist}/assets/img/`,
		watch: `${root.src}/img/**/*_webp.{jpg,jpeg,png}`,
	},
	fonts: {
		src: `${root.src}/fonts/**/*.{ttf,otf,woff,woff2}`,
		dist: `${root.dist}/assets/fonts/`,
		watch: `${root.src}/fonts/**/*.{ttf,otf,woff,woff2}`,
	},
	favicons: {
		src: `${root.src}/img/favicon.{jpg,jpeg,png,gif,svg}`,
		dist: `${root.dist}/assets/img/favicons/`,
		watch: `${root.src}/img/favicon.{jpg,jpeg,png,gif,svg}`,
	},
	svg: {
		src: `${root.src}/img/svg/*.svg`,
		dist: `${root.dist}/assets/img/`,
		watch: `${root.src}/img/svg/*.svg`,
	},
	htaccess: {
		src: `${root.src}/.htaccess`,
		dist: root.dist,
	},
};

const config = {
	root,
	bsyncConfig,
	paths,
};

export { config };
