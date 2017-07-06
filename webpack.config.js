const path = require('path');
const webpack = require('webpack');

module.exports ={
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer:{
        historyApiFallback: true,
        contentBase: './'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:[/node_modules/],
                use:[{
                    loader:'babel-loader',
                    options:{presets: ['es2015']},
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
