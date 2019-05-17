import { options as userOptions } from "../../build.options";

const root = {
	src: userOptions.root.src || "./src",
	dist: userOptions.root.dist || "./dist",
};

const bsyncConfig = {
	server: root.dist,
	notify: false,
	online: !!userOptions.browserSync.tunnel,
	middleware: [],
	...userOptions.browserSync,
};

const tasks = {
	cleanFiles: {
		run: true,
		...userOptions.tasks.cleanFiles,
	},
	views: {
		src: [`${root.src}/views/pages/*.twig`],
		dist: root.dist,
		watch: [`${root.src}/components/**/*.twig`, `${root.src}/views/**/*.twig`],
		run: true,
		...userOptions.tasks.views,
	},
	styles: {
		src: `${root.src}/sass/main.scss`,
		dist: `${root.dist}/assets/css/`,
		watch: [`${root.src}/components/**/*.scss`, `${root.src}/sass/**/*.scss`],
		run: true,
		...userOptions.tasks.styles,
	},
	scripts: {
		src: `${root.src}/js/index.js`,
		dist: `${root.dist}/assets/js/`,
		watch: [`${root.src}/components/**/*.js`, `${root.src}/js/**/*.js`],
		run: true,
		...userOptions.tasks.scripts,
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
		run: true,
		...userOptions.tasks.images,
	},
	webp: {
		src: `${root.src}/img/**/*_webp.{jpg,jpeg,png}`,
		dist: `${root.dist}/assets/img/`,
		watch: `${root.src}/img/**/*_webp.{jpg,jpeg,png}`,
		run: true,
		...userOptions.tasks.webp,
	},
	fonts: {
		src: `${root.src}/fonts/**/*.{ttf,otf,woff,woff2}`,
		dist: `${root.dist}/assets/fonts/`,
		watch: `${root.src}/fonts/**/*.{ttf,otf,woff,woff2}`,
		run: true,
		...userOptions.tasks.fonts,
	},
	favs: {
		src: `${root.src}/img/favicon.{jpg,jpeg,png,gif,svg}`,
		dist: `${root.dist}/assets/img/favicons/`,
		watch: `${root.src}/img/favicon.{jpg,jpeg,png,gif,svg}`,
		run: true,
		...userOptions.tasks.favs,
	},
	svg: {
		src: `${root.src}/img/svg/*.svg`,
		dist: `${root.dist}/assets/img/`,
		watch: `${root.src}/img/svg/*.svg`,
		run: true,
		...userOptions.tasks.svg,
	},
	htaccess: {
		src: `${root.src}/.htaccess`,
		dist: root.dist,
		run: true,
		...userOptions.tasks.fonts,
	},
};

const config = {
	root,
	bsyncConfig,
	tasks,
};

export { config };
