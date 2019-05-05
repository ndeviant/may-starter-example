import gulp from "gulp";
import gulpif from "gulp-if";
import browsersync from "browser-sync";
import rename from "gulp-rename";
import debug from "gulp-debug";
import webpack from "webpack";
import webpackStream from "webpack-stream";

import { config } from "./helpers/gulp.config";
import { isProduction } from "./helpers/mode";
import webpackConfig from "../webpack.config.babel";

const scripts = () =>
	gulp
		.src(config.paths.scripts.src)
		.pipe(
			webpackStream(webpackConfig),
			webpack,
		)
		.pipe(
			gulpif(
				isProduction,
				rename({
					suffix: ".min",
				}),
			),
		)
		.pipe(gulp.dest(config.paths.scripts.dist))
		.pipe(
			debug({
				title: "JS files",
			}),
		)
		.on("end", browsersync.reload);

export { scripts };
