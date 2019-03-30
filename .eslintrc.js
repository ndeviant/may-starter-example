module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": ["airbnb-base", "prettier"],
	"plugins": ["prettier"],
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module"
	},
	"rules": {
		"indent": "off",
		"import/no-extraneous-dependencies": [2, { devDependencies: true }],
		"import/no-unresolved": [
      "error",
      {
        "ignore": [ '%components%' ]
      }
    ],
		"prettier/prettier": ["error"],
		"no-shadow": "off",
		"import/prefer-default-export": "off",
		"no-plusplus": "off",
		"camelcase": "off",
		"no-use-before-define": ["error", { "functions": false }],
	}
}