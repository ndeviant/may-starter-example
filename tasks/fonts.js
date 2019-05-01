import gulp from "gulp";
import debug from "gulp-debug";

import { config } from "./gulp.config";

const fonts = () =>
	gulp
		.src(config.paths.fonts.src)
		.pipe(gulp.dest(config.paths.fonts.dist))
		.pipe(
			debug({
				title: "Fonts",
			}),
		);

export { fonts };
