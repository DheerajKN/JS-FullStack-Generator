const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const outputDirectory = 'build';
const webpack = require('webpack');

module.exports = (env) => {
    return {
        entry: ['babel-polyfill', './client/src/index.js'],
        output: {
            path: path.join(__dirname, outputDirectory),
            filename: 'bundle.js'
        },
        stats: "errors-only",
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'less-loader', // compiles Less to CSS
                ],
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets'
                }
            }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        devServer: {
            port: 3000,
            open: true,
            proxy: {
                '/api': 'http://localhost:8080'
            }
        },
        plugins: [
            new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: [outputDirectory] }),
            new WebpackAssetsManifest(),
            new webpack.DefinePlugin({
                'process.env.ELECTRON_PROD': JSON.stringify(env.ELECTRON_PROD)
            }),
            new HtmlWebpackPlugin({
                template: './client/public/index.html',
                favicon: './client/public/favico.ico'
            })
        ]
    }
};