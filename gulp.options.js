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
 * @property 	{String}	src 		- The path to source files of you project, defaults to `./src`.
 * @property 	{String}	dist 		- The path where to place compiled files, defaults to `./dist`.
 * @property 	{String}	assets 	- The path for assets, defaults to `${root.dist}/assets`.
 *
 */

const root = {};

/**
 *
 * BrowserSync
 *
 * @typedef		{Object}	browserSync	- Docs: browsersync.io/docs/options
 *
 */

const browserSync = {};

/**
 *
 * Tasks
 *
 * @typedef	{Object}	tasks - Each prop is reffering to existing task.
 *
 * @property	{Object}	[task]	- Any task, could be an object, or a function.
 *	 @property	{Bool}		run		- Disable any task, by setting this to false.
 *	 @property	{String}	src		- Where to get specific files for the task, by default starts from `root.src`.
 *	 @property	{String}	dist	- Where to place compiled files, by default starts from `root.dist`.
 *	 @property	{String}	watch	- Which files should gulp watch, by default starts from `root.src`.
 *
 * @property	{Function} [task] - Any task, as a function.
 *		@param	{Object} options	- Default options.
 * 		@return {Object} 					- Object with modified fields.
 *
 *	Note, that, it's recommended to disable `favs` task, by setting `run: false`,
 *	after you've created favicons, cause of performance considerations.
 *
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
