import gulp from "gulp";

import { cleanFiles } from "./cleanFiles";
import { favs } from "./favs";
import { fonts } from "./fonts";
import { htaccess } from "./htaccess";
import { images } from "./images";
import { scripts } from "./scripts";
import { styles } from "./styles";
import { svg } from "./svg";
import { views } from "./views";
import { webp } from "./webp";
import { config } from "./helpers/gulp.config";

const tasks = [
	cleanFiles,
	htaccess,
	styles,
	scripts,
	images,
	webp,
	fonts,
	favs,
	svg,
];

if (config.options.views.run) {
	tasks.push(views);
}

const build = gulp.series(...tasks);

export { build };
