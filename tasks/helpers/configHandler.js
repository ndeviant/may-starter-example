const paths = {
	root: {
		src: "./src/",
		dist: "./dist/",
	},
	views: {
		src: ["%src%/views/pages/*.njk"],
		dist: "./dist/",
		watch: ["./src/components/**/*.njk", "./src/views/**/*.njk"],
	},
	styles: {
		src: "./src/sass/main.scss",
		dist: "./dist/assets/css/",
		watch: ["./src/components/**/*.scss", "./src/sass/**/*.scss"],
	},
	scripts: {
		src: "./src/js/index.js",
		dist: "./dist/assets/js/",
		watch: ["./src/components/**/*.js", "./src/js/**/*.js"],
	},
	images: {
		src: [
			"./src/img/**/*.{jpg,jpeg,png,gif,svg}",
			"!./src/img/svg/*.svg",
			"!./src/img/favicon.{jpg,jpeg,png,gif,svg}",
		],
		dist: "./dist/assets/img/",
		watch: "this->src",
	},
	webp: {
		src: "./src/img/**/*_webp.{jpg,jpeg,png}",
		dist: "./dist/assets/img/",
		watch: "this->src",
	},
	fonts: {
		src: "./src/fonts/**/*.{ttf,otf,woff,woff2}",
		dist: "./dist/assets/fonts/",
		watch: "this->src",
	},
	favicons: {
		src: "./src/img/favicon.{jpg,jpeg,png,gif,svg}",
		dist: "./dist/assets/img/favicons/",
		watch: "this->src",
	},
	svg: {
		src: "./src/img/svg/*.svg",
		dist: "./dist/assets/img/",
		watch: "this->src",
	},
	htaccess: {
		src: "./src/.htaccess",
		dist: "./dist/",
	},
};

// Add %src%, %dist% to handler, so we can refference to the root fields
// Add this-> so we can refference the field in current object

const Okeys = (obj, ...rest) => Object.keys(obj, ...rest);

const refToThis = (obj, field, linkStr = "this->") => {
	const hasRef = field.indexOf(linkStr);

	if (hasRef === -1) return field;

	const thisField = field.replace(linkStr, "");

	if (!obj[thisField]) {
		console.error("Field you are reffering to doesnt exist.");
		return field;
	}

	return obj[thisField];
};

const refToRoot = (root, field) => {
	console.log("substrings", field);

	if (Array.isArray(field)) {
		field.forEach(fieldElem => {
			refToRoot(root, fieldElem);
		});
	}

	if (typeof field !== "string") return field;

	const substrings = field.match(/%[\w\d]+%/g);
	console.log("regexp", substrings);

	if (substrings === null) return field;

	substrings.forEach(substring => {
		const cleaned = substring.slice(1, -1);

		if (root[cleaned]) {
			field = field.replace(substring, root[cleaned]);
		} else {
			console.error("Shit!");
		}

		console.log("cleaned", cleaned);
	});
	// if (hasRef === -1) return field;

	// const thisField = field.replace(wrapStr, "");

	// if (!obj[thisField]) {
	// 	console.error("Field you are reffering to doesnt exist.");
	// 	return field;
	// }

	// return obj[thisField];
	return field;
};

const configHandler = config => {
	const { root } = config;

	const resultConfig = {};

	Okeys(config).forEach(taskKey => {
		const taskConfig = config[taskKey];

		if (taskKey === "root") {
			resultConfig[taskKey] = taskConfig;
			return;
		}

		const taskConfigKeys = Okeys(taskConfig);

		// Adding refs to root
		taskConfigKeys.forEach(key => {
			const field = taskConfig[key];

			taskConfig[key] = refToRoot(root, field);
		});

		// Adding refs to self
		taskConfigKeys.forEach(key => {
			const field = taskConfig[key];

			taskConfig[key] = refToThis(taskConfig, field);
		});

		resultConfig[taskKey] = taskConfig;
	});

	return resultConfig;
};
const jopi = configHandler(paths);
console.log(jopi);

module.exports = configHandler;
