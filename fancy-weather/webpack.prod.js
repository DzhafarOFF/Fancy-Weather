const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader","css-loader", "sass-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"],
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "imgs"
                    }
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html"
    })],
}