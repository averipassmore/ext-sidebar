const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
	
	module.exports = {
 		mode: 'production',
		target: 'web',
  		entry: {
			contentScript: './src/content/index.ts',
			background: './src/background/index.ts',
			react: './src/react/index.tsx'
		},
  		output: {
    			path: path.resolve( __dirname, 'dist'),
    			filename: '[name].js', // will take the keys in entry dynamically,
			clean: true
  		},
		plugins: [
			new HtmlWebpackPlugin({ template: './src/index.html'}),
			new CopyPlugin({
				patterns: [{
					from: path.resolve('manifest.json'),
					to: path.resolve('dist')
			}]}),
			new MiniCssExtractPlugin()
		],
		module: {
			rules: [
				{
					test: /.(ts|tsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								[ '@babel/preset-react', { 'runtime': 'automatic' } ],
								'@babel/preset-typescript',
							]
						}
					}
				},
				{ 
					test: /\.css$/, 
					use: [MiniCssExtractPlugin.loader, 'css-loader']
				},
				{
					test: /\.svg$/i,
					use: [
						{
							loader: 'svg-url-loader',
							options: {
								limit: 10000,
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: [ '.ts', '.tsx' ]
		}
	};