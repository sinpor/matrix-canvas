const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	devServer: {
		port: 3001,
		progress: true,
		contentBase: "./dist",
	},
	mode: "production",
	entry: "./src/index.ts",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
		}),
	],
	module: {
		rules: [{ test: /\.ts$/, loader: "ts-loader" }],
	},
}
