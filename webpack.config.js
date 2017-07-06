const path = require('path');
const webpack = require('webpack');

module.exports ={
    context: path.resolve(__dirname, './src'),
    entry: {
      app: './index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist/assets'),
        publicPath: '/assets',
    },
    devServer:{
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './src')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:[/node_modules/],
                use:[{
                    loader:'babel-loader',
                    options:{presets: ['es2015', 'react', 'stage-2']},
                }],
            },
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader'],
            },
            {
                test:/\.(sass|scss)$/,
                use:['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }



}
