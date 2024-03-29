import { isProduction } from "./tasks/helpers/isProduction";

const webpackConfig = {
	output: {
		filename: "[name].js",
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					query: {
						presets: [["@babel/preset-env", { modules: false }]],
					},
				},
			},
		],
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all",
					minChunks: 1,
				},
			},
		},
	},

	plugins: [],
};

webpackConfig.mode = isProduction ? "production" : "development";
webpackConfig.devtool = isProduction ? false : "cheap-eval-source-map";

export default webpackConfig;
