import gulp from "gulp";
import browsersync from "browser-sync";

import { favs } from "./favs";
import { images } from "./images";
import { scripts } from "./scripts";
import { styles } from "./styles";
import { svg } from "./svg";
import { views } from "./views";
import { webp } from "./webp";

import { config } from "./helpers/gulp.config";

const { bsyncConfig, paths, options } = config;

const server = () => {
	browsersync.init(bsyncConfig);

	if (options.views.run) {
		gulp.watch(paths.views.watch, views);
	}

	gulp.watch(paths.styles.watch, styles);
	gulp.watch(paths.scripts.watch, scripts);
	gulp.watch(paths.images.watch, images);
	gulp.watch(paths.webp.watch, webp);
	gulp.watch(paths.favicons.watch, favs);
	gulp.watch(paths.svg.watch, svg);
};

export { server };
