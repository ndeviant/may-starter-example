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

const develop = gulp.series(
	cleanFiles,
	gulp.parallel(views, styles, scripts, images, webp, fonts, favs, svg),
	gulp.parallel(server),
);

export { develop };
