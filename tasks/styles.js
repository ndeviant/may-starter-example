import gulp from "gulp";
import gulpif from "gulp-if";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import autoprefixer from "autoprefixer";
import sass from "gulp-sass";
import mqpacker from "css-mqpacker";
import sortCSSmq from "sort-css-media-queries";
import mincss from "gulp-clean-css";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import debug from "gulp-debug";

import { config } from "./gulp.config";
import { isProduction } from "./helpers/mode";

const styles = () =>
	gulp
		.src(config.paths.styles.src)
		.pipe(gulpif(!isProduction, sourcemaps.init()))
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "Styles",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(
			sass({
				includePaths: ["./node_modules"],
			}),
		)
		.pipe(
			postcss(
				[
					mqpacker({
						sort: sortCSSmq,
					}),
					isProduction
						? autoprefixer({
								browsers: ["last 12 versions", "> 1%", "ie 8", "ie 7"],
						  })
						: false,
				].filter(Boolean),
			),
		)
		.pipe(
			gulpif(
				isProduction,
				mincss({
					compatibility: "ie8",
					level: {
						1: {
							specialComments: 0,
							removeEmpty: true,
							removeWhitespace: true,
						},
						2: {
							mergeMedia: true,
							removeEmpty: true,
							removeDuplicateFontRules: true,
							removeDuplicateMediaBlocks: true,
							removeDuplicateRules: true,
							removeUnusedAtRules: false,
						},
					},
				}),
			),
		)
		.pipe(
			gulpif(
				isProduction,
				rename({
					suffix: ".min",
				}),
			),
		)
		.pipe(plumber.stop())
		.pipe(gulpif(!isProduction, sourcemaps.write("./maps/")))
		.pipe(gulp.dest(config.paths.styles.dist))
		.pipe(
			debug({
				title: "CSS files",
			}),
		)
		.pipe(browsersync.stream());

export { styles };
