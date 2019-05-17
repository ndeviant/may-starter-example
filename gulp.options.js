/**
 * Here you can manage your build process, without going through
 * tons of files, and modifing them.
 */

/**
 * Root
 * @typedef {Object} root - Note that tasks path's reffering to the root property by default.
 * @property {string} src - The path to source files of you project
 * @property {string} dist - The path where to place compiled files
 */

const options = {
	root: {
		src: "",
		dist: "",
	},
	browserSync: {},
	tasks: {
		cleanFiles: {
			run: true,
		},
		htaccess: {
			run: true,
		},
		views: {
			run: true,
		},
		styles: {
			run: true,
		},
		scripts: {
			run: true,
		},
		images: {
			run: true,
		},
		webp: {
			run: true,
		},
		favs: {
			run: true,
		},
		svg: {
			run: true,
		},
		fonts: {
			run: true,
		},
	},
};

export { options };
