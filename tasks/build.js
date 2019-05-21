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
import { media } from "./media";
import { config } from "./helpers/gulp.config";

const { tasks } = config;

const activeTasks = [
	tasks.cleanFiles.run ? cleanFiles : false,
	tasks.htaccess.run ? htaccess : false,
	tasks.views.run ? views : false,
	tasks.styles.run ? styles : false,
	tasks.scripts.run ? scripts : false,
	tasks.images.run ? images : false,
	tasks.webp.run ? webp : false,
	tasks.favs.run ? favs : false,
	tasks.svg.run ? svg : false,
	tasks.fonts.run ? fonts : false,
	tasks.media.run ? media : false,
].filter(Boolean);

const build = gulp.series(...activeTasks);

export { build };
