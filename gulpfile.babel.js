import gulp from "gulp";
import browsersync from "browser-sync";

import { cleanFiles } from "./tasks/cleanFiles";
import { favs } from "./tasks/favs";
import { fonts } from "./tasks/fonts";
import { htaccess } from "./tasks/htaccess";
import { images } from "./tasks/images";
import { scripts } from "./tasks/scripts";
import { styles } from "./tasks/styles";
import { svg } from "./tasks/svg";
import { views } from "./tasks/views";
import { webp } from "./tasks/webp";

import { config } from "./tasks/gulp.config";

const { bsyncConfig, paths } = config;

const server = () => {
	browsersync.init(bsyncConfig);

	gulp.watch(paths.views.watch, views);
	gulp.watch(paths.styles.watch, styles);
	gulp.watch(paths.scripts.watch, scripts);
	gulp.watch(paths.images.watch, images);
	gulp.watch(paths.webp.watch, webp);
	gulp.watch(paths.favicons.watch, favs);
	gulp.watch(paths.svg.watch, svg);
};

const development = gulp.series(
	cleanFiles,
	gulp.parallel(views, styles, scripts, images, webp, fonts, favs, svg),
	gulp.parallel(server),
);

const build = gulp.series(
	cleanFiles,
	htaccess,
	views,
	styles,
	scripts,
	images,
	webp,
	fonts,
	favs,
	svg,
);

export {
	cleanFiles,
	favs,
	fonts,
	htaccess,
	images,
	scripts,
	styles,
	svg,
	views,
	webp,
	server,
	development,
	build,
};

export default development;
