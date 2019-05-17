/**
 * Here you can manage your build process, without going through
 * tons of files, and modifing them.
 */

const options = {
	/**
	 * Root
	 * @typedef {Object} root - Note that tasks path's reffering to the root property by default.
	 * @property {string} src - The path to source files of you project.
	 * @property {string} dist - The path where to place compiled files.
	 */

	root: {},

	/**
	 * BrowserSync
	 * @typedef {Object} browserSync - Docs: browsersync.io/docs/options
	 */

	browserSync: {},

	/**
	 * Tasks
	 * @typedef {Object} tasks - Each prop is reffering to existing task.
	 * @property {Object} [task] - Any task.
	 *	 @property {bool} run - Disable any task, by setting this to false.
	 *	 @property {string} src - Where to get specific files for the task,
	 * 	 by default starts from "root.src" prop.
	 *	 @property {string} dist - Where to place compiled files,
	 *	 by default starts from "root.dist" prop.
	 *	 @property {string} watch - Which files should gulp watch,
	 *	 by default starts from "root.src" prop.
	 */

	tasks: {
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
	},
};

export { options };
