import gulp from "gulp";
import debug from "gulp-debug";

import { config } from "./helpers/gulp.config";

const fonts = () =>
	gulp
		.src(config.tasks.fonts.src)
		.pipe(gulp.dest(config.tasks.fonts.dist))
		.pipe(
			debug({
				title: "Fonts",
			}),
		);

export { fonts };
