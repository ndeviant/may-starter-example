import { options as userOptions } from "../../gulp.options";

/**
 * Root paths:
 * Default root path's
 */
const root = {
	src: userOptions.root.src || "./src",
	dist: userOptions.root.dist || "./dist",
};

root.assets = userOptions.root.assets || `${root.dist}/assets`;

/**
 * Bsync config:
 * Serve dist dir without `html` extension,
 * disables notifies, disables online, unless tunnel is on
 */

const bsyncConfig = {
	server: root.dist,
	notify: false,
	online: !!userOptions.browserSync.tunnel,
	middleware: [],
	...userOptions.browserSync,
};

/**
 * Tasks config:
 * Default configs for tasks. Has default `run: true`, on each.
 * Has `src, dist, watch` fields. Watch is often reffering to src.
 */

/**
 *  Clean files
 */

const cleanFiles = {
	run: true,
	...userOptions.tasks.cleanFiles,
};

/**
 * Views
 */

const views = {
	src: [`${root.src}/views/pages/*.htm`],
	dist: root.dist,
	watch: [`${root.src}/components/**/*.htm`, `${root.src}/views/**/*.htm`],
	run: true,
	...userOptions.tasks.views,
};

/**
 * Styles
 */

const styles = {
	src: `${root.src}/scss/main.scss`,
	dist: `${root.assets}/css/`,
	watch: [`${root.src}/components/**/*.scss`, `${root.src}/scss/**/*.scss`],
	run: true,
	...userOptions.tasks.styles,
};

/**
 * Scripts
 */

const scripts = {
	src: `${root.src}/js/index.js`,
	dist: `${root.assets}/js/`,
	watch: [`${root.src}/components/**/*.js`, `${root.src}/js/**/*.js`],
	run: true,
	...userOptions.tasks.scripts,
};

/**
 * Images
 */

const images = {
	src: [
		`${root.src}/images/**/*.{jpg,jpeg,png,gif,svg}`,
		`!${root.src}/images/svg/*.svg`,
		`!${root.src}/images/favicon.{jpg,jpeg,png,gif,svg}`,
	],
	dist: `${root.dist}/assets/images/`,
	run: true,
	...userOptions.tasks.images,
};

images.watch = userOptions.tasks.images.watch || images.src;

/**
 * WebP
 */

const webp = {
	src: `${root.src}/images/**/*_webp.{jpg,jpeg,png}`,
	dist: `${root.assets}/images/`,
	run: true,
	...userOptions.tasks.webp,
};

webp.watch = userOptions.tasks.webp.watch || webp.src;

/**
 * Fonts
 */

const fonts = {
	src: `${root.src}/fonts/**/*.{ttf,otf,woff,woff2}`,
	dist: `${root.assets}/fonts/`,
	run: true,
	...userOptions.tasks.fonts,
};

fonts.watch = userOptions.tasks.fonts.watch || fonts.src;

/**
 * Favs
 */

const favs = {
	src: `${root.src}/images/favicon.{jpg,jpeg,png,gif,svg}`,
	dist: `${root.assets}/images/favicons/`,
	run: true,
	...userOptions.tasks.favs,
};

favs.watch = userOptions.tasks.favs.watch || favs.src;

/**
 * Svg
 */

const svg = {
	src: `${root.src}/images/svg/*.svg`,
	dist: `${root.assets}/images/`,
	run: true,
	...userOptions.tasks.svg,
};

svg.watch = userOptions.tasks.svg.watch || svg.src;

/**
 * Media
 */

const media = {
	src: `${root.src}/media/**/*`,
	dist: `${root.assets}/media/`,
	run: true,
	...userOptions.tasks.media,
};

/**
 * Htaccess
 */

const htaccess = {
	src: `${root.src}/.htaccess`,
	dist: root.dist,
	run: true,
	...userOptions.tasks.fonts,
};

/**
 * All tasks
 */

const tasks = {
	cleanFiles,
	views,
	styles,
	scripts,
	images,
	webp,
	fonts,
	favs,
	svg,
	media,
	htaccess,
};

/**
 * Result config
 */

const config = {
	root,
	bsyncConfig,
	tasks,
};

export { config };
