import gulp from "gulp";
import debug from "gulp-debug";
import changed from "gulp-changed";

import { config } from "./helpers/gulp.config";

const fonts = () =>
	gulp
		.src(config.tasks.fonts.src)
		.pipe(changed(config.tasks.fonts.dist))
		.pipe(gulp.dest(config.tasks.fonts.dist))
		.pipe(
			debug({
				title: "Fonts",
			}),
		);

export { fonts };
