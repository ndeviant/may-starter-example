import gulp from "gulp";
import debug from "gulp-debug";
import favicons from "gulp-favicons";

import { config } from "./helpers/gulp.config";

const favs = () =>
	gulp
		.src(config.paths.favicons.src)
		.pipe(
			favicons({
				background: "transparent",
				icons: {
					appleIcon: true,
					favicons: true,
					online: false,
					appleStartup: false,
					android: false,
					firefox: false,
					yandex: false,
					windows: false,
					coast: false,
				},
			}),
		)
		.pipe(gulp.dest(config.paths.favicons.dist))
		.pipe(
			debug({
				title: "Favicons",
			}),
		);

export { favs };
