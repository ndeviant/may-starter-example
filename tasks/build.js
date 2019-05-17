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

const { tasks: configTasks } = config;

const tasks = [
	configTasks.cleanFiles.run ? cleanFiles : false,
	configTasks.htaccess.run ? htaccess : false,
	configTasks.views.run ? views : false,
	configTasks.styles.run ? styles : false,
	configTasks.scripts.run ? scripts : false,
	configTasks.images.run ? images : false,
	configTasks.webp.run ? webp : false,
	configTasks.favs.run ? favs : false,
	configTasks.svg.run ? svg : false,
	configTasks.fonts.run ? fonts : false,
].filter(Boolean);

const build = gulp.series(...tasks);

export { build };
