import webpack from "webpack";
import webpackStream from "webpack-stream";
import gulp from "gulp";
import gulpif from "gulp-if";
import browsersync from "browser-sync";
import autoprefixer from "autoprefixer";
import nunjucksRender from "gulp-nunjucks-render";
import sass from "gulp-sass";
import mqpacker from "css-mqpacker";
import sortCSSmq from "sort-css-media-queries";
import mincss from "gulp-clean-css";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminGiflossy from "imagemin-giflossy";
import imageminWebp from "imagemin-webp";
import webp from "gulp-webp";
import favicons from "gulp-favicons";
import svgSprite from "gulp-svg-sprite";
import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import debug from "gulp-debug";
import clean from "gulp-clean";

import webpackConfig from "./webpack.config";

const isProduction = process.env.NODE_ENV === "production";

const root = {
	src: "./src",
	dist: "./dist",
};

const serverConfig = {
	server: root.dist,
	notify: true,
};

const paths = {
	views: {
		src: [`${root.src}/views/pages/*.njk`],
		dist: root.dist,
		watch: [`${root.src}/components/**/*.njk`, `${root.src}/views/**/*.njk`],
	},
	styles: {
		src: `${root.src}/sass/main.scss`,
		dist: `${root.dist}/assets/css/`,
		watch: [`${root.src}/components/**/*.scss`, `${root.src}/sass/**/*.scss`],
	},
	scripts: {
		src: `${root.src}/js/index.js`,
		dist: `${root.dist}/assets/js/`,
		watch: [`${root.src}/components/**/*.js`, `${root.src}/js/**/*.js`],
	},
	images: {
		src: [
			`${root.src}/img/**/*.{jpg,jpeg,png,gif,svg}`,
			"!%src%/img/svg/*.svg",
			"!%src%/img/favicon.{jpg,jpeg,png,gif,svg}",
		],
		dist: `${root.dist}/assets/img/`,
		watch: [
			`${root.src}/img/**/*.{jpg,jpeg,png,gif,svg}`,
			"!%src%/img/svg/*.svg",
			"!%src%/img/favicon.{jpg,jpeg,png,gif,svg}",
		],
	},
	webp: {
		src: `${root.src}/img/**/*_webp.{jpg,jpeg,png}`,
		dist: `${root.dist}/assets/img/`,
		watch: `${root.src}/img/**/*_webp.{jpg,jpeg,png}`,
	},
	fonts: {
		src: `${root.src}/fonts/**/*.{ttf,otf,woff,woff2}`,
		dist: `${root.dist}/assets/fonts/`,
		watch: `${root.src}/fonts/**/*.{ttf,otf,woff,woff2}`,
	},
	favicons: {
		src: `${root.src}/img/favicon.{jpg,jpeg,png,gif,svg}`,
		dist: `${root.dist}/assets/img/favicons/`,
		watch: `${root.src}/img/favicon.{jpg,jpeg,png,gif,svg}`,
	},
	svg: {
		src: `${root.src}/img/svg/*.svg`,
		dist: `${root.dist}/assets/img/`,
		watch: `${root.src}/img/svg/*.svg`,
	},
	htaccess: {
		src: `${root.src}/.htaccess`,
		dist: root.dist,
	},
};

webpackConfig.mode = isProduction ? "production" : "development";
webpackConfig.devtool = isProduction ? false : "cheap-eval-source-map";

export const cleanFiles = () =>
	gulp
		.src("./dist/*", { read: false })
		.pipe(clean())
		.pipe(
			debug({
				title: "Cleaning...",
			}),
		);

export const htaccess = () =>
	gulp
		.src(paths.htaccess.src)
		.pipe(gulp.dest(paths.htaccess.dist))
		.pipe(
			debug({
				title: "Server config",
			}),
		);

export const views = () =>
	gulp
		.src(paths.views.src)
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "Views",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(
			nunjucksRender({
				path: "./src/",
			}),
		)
		.pipe(gulpif(isProduction, replace("main.css", "main.min.css")))
		.pipe(gulpif(isProduction, replace("vendor.js", "vendor.min.js")))
		.pipe(gulpif(isProduction, replace("main.js", "main.min.js")))
		.pipe(gulp.dest(paths.views.dist))
		.on("end", browsersync.reload);

export const styles = () =>
	gulp
		.src(paths.styles.src)
		.pipe(gulpif(!isProduction, sourcemaps.init()))
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "Styles",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(
			sass({
				includePaths: ["./node_modules"],
			}),
		)
		.pipe(
			postcss(
				[
					mqpacker({
						sort: sortCSSmq,
					}),
					isProduction
						? autoprefixer({
								browsers: ["last 12 versions", "> 1%", "ie 8", "ie 7"],
						  })
						: false,
				].filter(Boolean),
			),
		)
		.pipe(
			gulpif(
				isProduction,
				mincss({
					compatibility: "ie8",
					level: {
						1: {
							specialComments: 0,
							removeEmpty: true,
							removeWhitespace: true,
						},
						2: {
							mergeMedia: true,
							removeEmpty: true,
							removeDuplicateFontRules: true,
							removeDuplicateMediaBlocks: true,
							removeDuplicateRules: true,
							removeUnusedAtRules: false,
						},
					},
				}),
			),
		)
		.pipe(
			gulpif(
				isProduction,
				rename({
					suffix: ".min",
				}),
			),
		)
		.pipe(plumber.stop())
		.pipe(gulpif(!isProduction, sourcemaps.write("./maps/")))
		.pipe(gulp.dest(paths.styles.dist))
		.pipe(
			debug({
				title: "CSS files",
			}),
		)
		.pipe(browsersync.stream());

export const scripts = () =>
	gulp
		.src(paths.scripts.src)
		.pipe(
			webpackStream(webpackConfig),
			webpack,
		)
		.pipe(
			gulpif(
				isProduction,
				rename({
					suffix: ".min",
				}),
			),
		)
		.pipe(gulp.dest(paths.scripts.dist))
		.pipe(
			debug({
				title: "JS files",
			}),
		)
		.on("end", browsersync.reload);

export const images = () =>
	gulp
		.src(paths.images.src)
		.pipe(
			gulpif(
				isProduction,
				imagemin([
					imageminGiflossy({
						optimizationLevel: 3,
						optimize: 3,
						lossy: 2,
					}),
					imageminPngquant({
						speed: 5,
						quality: "30-50",
					}),
					imageminZopfli({
						more: true,
					}),
					imageminMozjpeg({
						progressive: true,
						quality: 70,
					}),
					imagemin.svgo({
						plugins: [
							{ removeViewBox: false },
							{ removeUnusedNS: false },
							{ removeUselessStrokeAndFill: false },
							{ cleanupIDs: false },
							{ removeComments: true },
							{ removeEmptyAttrs: true },
							{ removeEmptyText: true },
							{ collapseGroups: true },
						],
					}),
				]),
			),
		)
		.pipe(gulp.dest(paths.images.dist))
		.pipe(
			debug({
				title: "Images",
			}),
		)
		.on("end", browsersync.reload);

export const webpimages = () =>
	gulp
		.src(paths.webp.src)
		.pipe(
			webp(
				gulpif(
					isProduction,
					imageminWebp({
						lossless: true,
						quality: 90,
						alphaQuality: 90,
					}),
				),
			),
		)
		.pipe(gulp.dest(paths.webp.dist))
		.pipe(
			debug({
				title: "WebP images",
			}),
		);

export const fonts = () =>
	gulp
		.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dist))
		.pipe(
			debug({
				title: "Fonts",
			}),
		);

export const favs = () =>
	gulp
		.src(paths.favicons.src)
		.pipe(
			favicons({
				background: "transparent",
				icons: {
					appleIcon: true,
					favicons: true,
					online: false,
					appleStartup: false,
					android: false,
					firefox: false,
					yandex: false,
					windows: false,
					coast: false,
				},
			}),
		)
		.pipe(gulp.dest(paths.favicons.dist))
		.pipe(
			debug({
				title: "Favicons",
			}),
		);

export const svg = () =>
	gulp
		.src(paths.svg.src)
		.pipe(
			plumber({
				errorHandler: notify.onError(() => ({
					title: "Svg",
					message: "Error: <%= error.message %>",
				})),
			}),
		)
		.pipe(
			svgSprite({
				shape: {
					id: {
						generator: `svg-%s`,
					},
					spacing: {
						padding: 1,
					},
					dimension: {
						maxWidth: 32,
						maxHeight: 32,
					},
				},
				mode: {
					stack: {
						dest: ".",
						bust: false,
						sprite: "sprite.svg",
					},
				},
			}),
		)
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.svg.dist))
		.pipe(
			debug({
				title: "Svg sprite",
			}),
		)
		.on("end", browsersync.reload);

export const server = () => {
	browsersync.init(serverConfig);

	gulp.watch(paths.views.watch, views);
	gulp.watch(paths.styles.watch, styles);
	gulp.watch(paths.scripts.watch, scripts);
	gulp.watch(paths.images.watch, images);
	gulp.watch(paths.webp.watch, webpimages);
	gulp.watch(paths.favicons.watch, favs);
	gulp.watch(paths.svg.watch, svg);
};

export const development = gulp.series(
	cleanFiles,
	gulp.parallel(views, styles, scripts, images, webpimages, fonts, favs, svg),
	gulp.parallel(server),
);

export const build = gulp.series(
	cleanFiles,
	htaccess,
	views,
	styles,
	scripts,
	images,
	webpimages,
	fonts,
	favs,
	svg,
);

export default development;
