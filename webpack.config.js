const webpack = require('webpack');
const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const src  = path.resolve(__dirname, "src");
const publicDir = path.resolve(__dirname, "public");
const dist = path.resolve(__dirname, "build");

const env = dotenv.config().parsed;
const isDevelopment = env.REACT_APP_ENV === "development";

module.exports = {
    target: "web",
    mode: isDevelopment ? "development" : "production",
    entry: src + "/index.tsx",

    output: {
        path: dist,
        filename: "bundle.js",
        publicPath: "/"
    },

    module: {
        rules: [
            // https://stackoverflow.com/questions/50824024/urierror-failed-to-decode-param-public-url-favicon-ico
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
            },

            // ts, tsxをロードできるように
            {
                test: /\.(ts|tsx)$/,
                use: ["ts-loader"],
                exclude: /node_modules/
            },

            // CSS Modulesに該当するスタイルシートの処理
            {
                test: /\.module\.(sa|sc|c)ss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: isDevelopment }
                    }
                ]
            },

            // 通常のスタイルシートの処理
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.(sa|sc|c)ss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: isDevelopment }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(env)
        }),
        new HtmlWebpackPlugin({
            template: publicDir + "/index.html",
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? "[name].css" : "[name].[hash].css",
            chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
        }),
    ],

    devServer: {
        contentBase: "build",
        hot: true,
        open: true,
        historyApiFallback: true,
        port: 3007
    }
};
