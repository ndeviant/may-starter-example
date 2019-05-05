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

export { build };
