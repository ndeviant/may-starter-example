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
import { media } from "./media";
import { server } from "./server";

import { config } from "./helpers/gulp.config";

const { tasks } = config;

const activeTasks = [
	tasks.views.run ? views : false,
	tasks.styles.run ? styles : false,
	tasks.scripts.run ? scripts : false,
	tasks.images.run ? images : false,
	tasks.webp.run ? webp : false,
	tasks.fonts.run ? fonts : false,
].filter(Boolean);

const additionalTasks = [
	tasks.favs.run ? favs : false,
	tasks.svg.run ? svg : false,
	tasks.media.run ? media : false,
].filter(Boolean);

const develop = gulp.series(
	cleanFiles,
	gulp.parallel(...activeTasks),
	gulp.parallel(server, ...additionalTasks),
);

export { develop };
