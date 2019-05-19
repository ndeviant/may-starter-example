import gulp from "gulp";
import debug from "gulp-debug";
import favicons from "gulp-favicons";
import { argv } from "yargs";

import { config } from "./helpers/gulp.config";

const { toSrc } = argv;
const srcPath = `${config.root.src}/images/favicons/`;

const favs = () =>
	gulp
		.src(config.tasks.favs.src)
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
		.pipe(gulp.dest(toSrc ? srcPath : config.tasks.favs.dist))
		.pipe(
			debug({
				title: "Favicons",
			}),
		);

export { favs };
