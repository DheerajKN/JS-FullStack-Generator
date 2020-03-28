const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const outputDirectory = 'build';
const webpack = require('webpack');
const Config = require('./template.config.js');

module.exports = (env) => {
    return {
        entry: './client/src/main.js',
        output: {
            path: path.resolve(__dirname, outputDirectory),
            filename: 'build.js'
        },
        stats: 'errors-only',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        ExtractCssChunks.loader,
                        'css-loader'
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        ExtractCssChunks.loader,
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        ExtractCssChunks.loader,
                        'css-loader',
                        'less-loader'
                    ],
                },
                {
                    test: /\.svelte$/,
                    // exclude: [/node_modules/],
                    use: [{
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            hotReload: false,
                            preprocess: require('svelte-preprocess')({ 
                                transformers: {
                                    scss: true,
                                    sass: true,
                                    less: true
                                }
                            })
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    use: [{
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'icons/sprite-[hash:8].svg'
                            }
                        },
                    'svgo-loader']
                }
            ]
        },
        resolve: {
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'browser', 'module', 'main']
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
            new webpack.DefinePlugin({
                'process.env.ELECTRON_PROD': JSON.stringify(env.ELECTRON_PROD)
            }),
            new ExtractCssChunks(
                {
                  filename: "[name].css",
                  chunkFilename: "[id].css",
                  hot: true, 
                  orderWarning: true, 
                  reloadAll: true,
                  cssModules: true
                }
            ),
            new SpriteLoaderPlugin({
                plainSprite: true
            } ),
            new CopyWebpackPlugin([{ from: 'client/src/assets'}]),
            new HtmlWebpackPlugin({
                title: 'Vue with Webpack',
                template: './client/public/index.html',
                favicon: './client/public/favico.ico'
            })
        ]
    }
};
