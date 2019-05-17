import gulp from "gulp";

import { cleanFiles } from "./cleanFiles";
import { favs } from "./favs";
import { fonts } from "./fonts";
import { images } from "./images";
import { scripts } from "./scripts";
import { styles } from "./styles";
import { svg } from "./svg";
import { views } from "./views";
import { webp } from "./webp";
import { server } from "./server";

import { config } from "./helpers/gulp.config";

const { tasks: configTasks } = config;

const tasks = [
	configTasks.views.run ? views : false,
	configTasks.styles.run ? styles : false,
	configTasks.scripts.run ? scripts : false,
	configTasks.images.run ? images : false,
	configTasks.webp.run ? webp : false,
	configTasks.favs.run ? favs : false,
	configTasks.svg.run ? svg : false,
	configTasks.fonts.run ? fonts : false,
].filter(Boolean);

const develop = gulp.series(
	cleanFiles,
	gulp.parallel(...tasks),
	gulp.parallel(server),
);

export { develop };
