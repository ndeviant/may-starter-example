import gulp from "gulp";
import gulpif from "gulp-if";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminGiflossy from "imagemin-giflossy";

import { config } from "./helpers/gulp.config";
import { isProduction } from "./helpers/mode";

const images = () =>
	gulp
		.src(config.tasks.images.src)
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "Images",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(changed(config.tasks.images.dist))
		.pipe(
			gulpif(
				isProduction,
				imagemin([
					imageminGiflossy({
						optimizationLevel: 3,
						optimize: 3,
						lossy: 2,
					}),
					imageminPngquant({
						speed: 5,
						quality: "30-50",
					}),
					imageminZopfli({
						more: true,
					}),
					imageminMozjpeg({
						progressive: true,
						quality: 70,
					}),
					imagemin.svgo({
						plugins: [
							{ removeViewBox: false },
							{ removeUnusedNS: false },
							{ removeUselessStrokeAndFill: false },
							{ cleanupIDs: false },
							{ removeComments: true },
							{ removeEmptyAttrs: true },
							{ removeEmptyText: true },
							{ collapseGroups: true },
						],
					}),
				]),
			),
		)
		.pipe(gulp.dest(config.tasks.images.dist))
		.pipe(
			debug({
				title: "Images",
			}),
		)
		.on("end", browsersync.reload);

export { images };
