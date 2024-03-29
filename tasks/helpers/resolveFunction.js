const resolveFunction = (userOption, defaultOption) => {
	if (!userOption || typeof userOption !== "function") {
		return userOption;
	}
	return userOption(defaultOption);
};

export { resolveFunction };
