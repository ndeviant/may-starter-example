/**
 * Here you can manage your build process, without going through
 * tons of files, and modifing them.
 * All default values can be found in `./tasks/helpers/gulp.config.js`.
 */

/**
 *
 * Root
 *
 * @typedef 	{Object}	root 		- Note that tasks path's reffering to the root property by default.
 * @property 	{string}	src 		- The path to source files of you project, defaults to `./src`.
 * @property 	{string}	dist 		- The path where to place compiled files, defaults to `./dist`.
 * @property 	{string}	assets 	- The path for assets, defaults to `${root.dist}/assets`.
 */

const root = {};

/**
 *
 * BrowserSync
 *
 * @typedef		{Object}	browserSync	- Docs: browsersync.io/docs/options
 */

const browserSync = {};

/**
 *
 * Tasks
 *
 * @typedef	{Object}	tasks - Each prop is reffering to existing task.
 * @property	{Object}	[task]	- Any task.
 *	 @property	{bool}		run		- Disable any task, by setting this to false.
 *	 @property	{string}	src		- Where to get specific files for the task, by default starts from `root.src`.
 *	 @property	{string}	dist	- Where to place compiled files, by default starts from `root.dist`.
 *	 @property	{string}	watch	- Which files should gulp watch, by default starts from `root.src`.
 */

const tasks = {
	cleanFiles: {},
	htaccess: {},
	views: {},
	styles: {},
	scripts: {},
	images: {},
	webp: {},
	favs: {},
	svg: {},
	fonts: {},
	media: {},
};

const options = {
	root,
	browserSync,
	tasks,
};

export { options };
