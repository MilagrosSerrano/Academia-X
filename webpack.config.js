const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['./menuRestaurantOnline/src/index.js'],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: false
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
             template: './menuRestaurantOnline/src/index.html',
             chunks: ['index'],
             filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './menuRestaurantOnline/src/products.html',
            chunks: ['products'],
            filename: 'products.html'
       }),

    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: 'asset/resource'
            }
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },

}