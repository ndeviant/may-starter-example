import gulp from "gulp";
import clean from "gulp-clean";
import debug from "gulp-debug";

import { config } from "./helpers/gulp.config";

const path = [
	`${config.root.dist}/*.{html, htaccess}`,
	`${config.root.dist}/assets/*`,
];

const cleanFiles = () =>
	gulp
		.src(path, {
			read: false,
		})
		.pipe(clean())
		.pipe(
			debug({
				title: "Cleaning...",
			}),
		);

export { cleanFiles };
