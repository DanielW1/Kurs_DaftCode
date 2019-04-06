const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "style.css"
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins:["@babel/transform-runtime"]
                }
            }
        },
        {
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                isProduction ?
                    MiniCssExtractPlugin.loader :
                    { loader: 'style-loader', options: { sourceMap: true } },
                { loader: 'css-loader', options: { sourceMap: isProduction } },
                { loader: 'postcss-loader', options: { sourceMap: isProduction } },
                { loader: 'sass-loader', options: { sourceMap: isProduction } },

            ]
        }
        ]
    }
};
