import { options as userOptions } from "../../gulp.options";

const root = {
	src: userOptions.root.src || "./src",
	dist: userOptions.root.dist || "./dist",
};

root.assets = userOptions.root.assets || `${root.dist}/assets`;

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
		src: [`${root.src}/views/pages/*.htm`],
		dist: root.dist,
		watch: [`${root.src}/components/**/*.htm`, `${root.src}/views/**/*.htm`],
		run: true,
		...userOptions.tasks.views,
	},
	styles: {
		src: `${root.src}/sass/main.scss`,
		dist: `${root.assets}/css/`,
		watch: [`${root.src}/components/**/*.scss`, `${root.src}/sass/**/*.scss`],
		run: true,
		...userOptions.tasks.styles,
	},
	scripts: {
		src: `${root.src}/js/index.js`,
		dist: `${root.assets}/js/`,
		watch: [`${root.src}/components/**/*.js`, `${root.src}/js/**/*.js`],
		run: true,
		...userOptions.tasks.scripts,
	},
	images: {
		src: [
			`${root.src}/images/**/*.{jpg,jpeg,png,gif,svg}`,
			`!${root.src}/images/svg/*.svg`,
			`!${root.src}/images/favicon.{jpg,jpeg,png,gif,svg}`,
		],
		dist: `${root.dist}/assets/images/`,
		watch: [
			`${root.src}/images/**/*.{jpg,jpeg,png,gif,svg}`,
			`!${root.src}/images/svg/*.svg`,
			`!${root.src}/images/favicon.{jpg,jpeg,png,gif,svg}`,
		],
		run: true,
		...userOptions.tasks.images,
	},
	webp: {
		src: `${root.src}/images/**/*_webp.{jpg,jpeg,png}`,
		dist: `${root.assets}/images/`,
		watch: `${root.src}/images/**/*_webp.{jpg,jpeg,png}`,
		run: true,
		...userOptions.tasks.webp,
	},
	fonts: {
		src: `${root.src}/fonts/**/*.{ttf,otf,woff,woff2}`,
		dist: `${root.assets}/fonts/`,
		watch: `${root.src}/fonts/**/*.{ttf,otf,woff,woff2}`,
		run: true,
		...userOptions.tasks.fonts,
	},
	favs: {
		src: `${root.src}/images/favicon.{jpg,jpeg,png,gif,svg}`,
		dist: `${root.assets}/images/favicons/`,
		watch: `${root.src}/images/favicon.{jpg,jpeg,png,gif,svg}`,
		run: true,
		...userOptions.tasks.favs,
	},
	svg: {
		src: `${root.src}/images/svg/*.svg`,
		dist: `${root.assets}/images/`,
		watch: `${root.src}/images/svg/*.svg`,
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
