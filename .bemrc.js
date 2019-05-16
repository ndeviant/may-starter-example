module.exports = {
	root: true,
	modules: {
		"bem-tools": {
			plugins: {
				create: {
					techs: ["twig", "scss", "js"],
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