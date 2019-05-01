import gulp from "gulp";
import debug from "gulp-debug";

import { config } from "./gulp.config";

const htaccess = () =>
	gulp
		.src(config.paths.htaccess.src)
		.pipe(gulp.dest(config.paths.htaccess.dist))
		.pipe(
			debug({
				title: "Server config",
			}),
		);

export { htaccess };
