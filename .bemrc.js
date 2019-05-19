module.exports = {
	root: true,
	modules: {
		"bem-tools": {
			plugins: {
				create: {
					techs: ["htm", "scss", "js"],
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