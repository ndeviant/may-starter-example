import gulp from "gulp";
import gulpif from "gulp-if";
import changed from "gulp-changed";
import imageminWebp from "imagemin-webp";
import gulpwebp from "gulp-webp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import debug from "gulp-debug";

import { config } from "./helpers/gulp.config";
import { isProduction } from "./helpers/mode";

const webp = () =>
	gulp
		.src(config.paths.webp.src)
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "WebP",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(changed(config.paths.webp.dist))
		.pipe(
			gulpwebp(
				gulpif(
					isProduction,
					imageminWebp({
						lossless: true,
						quality: 90,
						alphaQuality: 90,
					}),
				),
			),
		)
		.pipe(gulp.dest(config.paths.webp.dist))
		.pipe(
			debug({
				title: "WebP images",
			}),
		);

export { webp };
