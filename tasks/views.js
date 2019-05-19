import gulp from "gulp";
import gulpif from "gulp-if";
import notify from "gulp-notify";
import replace from "gulp-replace";
import plumber from "gulp-plumber";
import twig from "gulp-twig";
import browsersync from "browser-sync";

import { config } from "./helpers/gulp.config";
import { isProduction } from "./helpers/isProduction";
import data from "../template.data";

const views = () =>
	gulp
		.src(config.tasks.views.src)
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "Views",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(
			twig({
				base: `${config.root.src}/`,
				data,
			}),
		)
		.pipe(gulpif(isProduction, replace("main.css", "main.min.css")))
		.pipe(gulpif(isProduction, replace("vendor.js", "vendor.min.js")))
		.pipe(gulpif(isProduction, replace("main.js", "main.min.js")))
		.pipe(gulp.dest(config.tasks.views.dist))
		.on("end", browsersync.reload);

export { views };
