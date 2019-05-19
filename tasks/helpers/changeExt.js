import gulp from "gulp";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import clean from "gulp-clean";
import rename from "gulp-rename";
import { argv } from "yargs";

import { config } from "./gulp.config";

const { from, to } = argv;

const changeExt = () =>
	gulp
		.src(`${config.root.src}/**/*.${from}`)
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "Change extension",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(clean())
		.pipe(
			rename(path => {
				// eslint-disable-next-line no-param-reassign
				path.extname = `.${to}`;
			}),
		)
		.pipe(gulp.dest(`${config.root.src}/`));

export { changeExt };
