import gulp from "gulp";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import debug from "gulp-debug";
import svgSprite from "gulp-svg-sprite";
import browsersync from "browser-sync";

import { config } from "./helpers/gulp.config";

const svg = () =>
	gulp
		.src(config.paths.svg.src)
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "Svg",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(
			svgSprite({
				shape: {
					id: {
						generator: `svg-%s`,
					},
					spacing: {
						padding: 1,
					},
					dimension: {
						maxWidth: 32,
						maxHeight: 32,
					},
				},
				mode: {
					stack: {
						dest: ".",
						bust: false,
						sprite: "sprite.svg",
					},
				},
			}),
		)
		.pipe(plumber.stop())
		.pipe(gulp.dest(config.paths.svg.dist))
		.pipe(
			debug({
				title: "Svg sprite",
			}),
		)
		.on("end", browsersync.reload);

export { svg };
