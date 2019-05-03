import gulp from "gulp";
import gulpif from "gulp-if";
import notify from "gulp-notify";
import replace from "gulp-replace";
import plumber from "gulp-plumber";
import nunjucksRender from "gulp-nunjucks-render";
import browsersync from "browser-sync";

import { config } from "./gulp.config";
import { isProduction } from "./helpers/mode";
import data from "../template.data";

const views = () =>
	gulp
		.src(config.paths.views.src)
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "Views",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(
			nunjucksRender({
				path: `${config.root.src}/`,
				data,
			}),
		)
		.pipe(gulpif(isProduction, replace("main.css", "main.min.css")))
		.pipe(gulpif(isProduction, replace("vendor.js", "vendor.min.js")))
		.pipe(gulpif(isProduction, replace("main.js", "main.min.js")))
		.pipe(gulp.dest(config.paths.views.dist))
		.on("end", browsersync.reload);

export { views };
