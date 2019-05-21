import gulp from "gulp";
import debug from "gulp-debug";

import { config } from "./helpers/gulp.config";

const media = () =>
	gulp
		.src(config.tasks.media.src)
		.pipe(gulp.dest(config.tasks.media.dist))
		.pipe(
			debug({
				title: "Media",
			}),
		);

export { media };
