// Add %src%, %dist% to path, so you can refference to the root fields
// Add this-> so you can refference the field in current object

const recursiveCall = (field, recursive, callback) => {
	if (typeof field === "object" && field !== null && !Array.isArray(field)) {
		if (!recursive) return field;

		const newField = {};

		Object.keys(field).forEach(innerFieldKey => {
			newField[innerFieldKey] = callback(field[innerFieldKey]);
		});

		return newField;
	}

	return false;
};

const refToThis = (obj, field, recursive = true, linkStr = "this->") => {
	const recursiveField = recursiveCall(field, recursive, innerField => {
		return refToThis(field, innerField);
	});

	if (recursiveField) return recursiveField;

	if (typeof field !== "string") return field;

	const hasRef = field.indexOf(linkStr);

	if (hasRef === -1) return field;

	const thisField = field.replace(linkStr, "");

	if (!obj[thisField]) {
		// eslint-disable-next-line no-console
		console.error(`Field you are reffering to doesnt exist: ${thisField}`);
		return field;
	}

	return obj[thisField];
};

const refToRoot = (root, field, recursive = true) => {
	const recursiveField = recursiveCall(field, recursive, innerField => {
		return refToRoot(root, innerField);
	});

	if (recursiveField) return recursiveField;

	if (Array.isArray(field)) {
		return field.map(fieldElem => {
			return refToRoot(root, fieldElem);
		});
	}

	if (typeof field !== "string") return field;

	const substrings = field.match(/%[\w\d]+%/g);

	if (substrings === null) return field;

	substrings.forEach(substring => {
		const cleaned = substring.slice(1, -1);

		if (!root[cleaned]) {
			// eslint-disable-next-line no-console
			console.error(`You dont have such field in 'root': ${cleaned}`);
			return;
		}

		// eslint-disable-next-line no-param-reassign
		field = field.replace(substring, root[cleaned]).replace("//", "/");
	});

	return field;
};

const configHandler = config => {
	const { root } = config;

	const resultConfig = { root };

	Object.keys(config).forEach(taskKey => {
		if (taskKey === "root") return;

		const taskConfig = config[taskKey];

		const taskConfigKeys = Object.keys(taskConfig);

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

module.exports = configHandler;
