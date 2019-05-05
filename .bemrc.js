module.exports = {
	root: true,
	modules: {
		"bem-tools": {
			plugins: {
				create: {
					techs: ["njk", "scss", "js"],
					levels: {
						"./src/components/blocks": {
							default: true
						}
					}
				}
			}
		}
	}
};