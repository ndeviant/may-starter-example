import gulp from "gulp";
import browsersync from "browser-sync";

import { favs } from "./favs";
import { images } from "./images";
import { scripts } from "./scripts";
import { styles } from "./styles";
import { svg } from "./svg";
import { views } from "./views";
import { webp } from "./webp";

import { config } from "./gulp.config";

const server = () => {
	browsersync.init(config.serverConfig);

	gulp.watch(config.paths.views.watch, views);
	gulp.watch(config.paths.styles.watch, styles);
	gulp.watch(config.paths.scripts.watch, scripts);
	gulp.watch(config.paths.images.watch, images);
	gulp.watch(config.paths.webp.watch, webp);
	gulp.watch(config.paths.favicons.watch, favs);
	gulp.watch(config.paths.svg.watch, svg);
};

export { server };
