const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer : {
        contentBase : path.resolve(__dirname, "public"),
        port : 9000,
        hot : true
    },
    mode : "development",
    entry : {
        main : ["./source/main.js", "./source/data.js"],
        complete : ["./source/complete.js"]
    },
    output:{
        path : path.resolve(__dirname, "public"),
        filename : '[name]_bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './source/main.html',
            filename : './main.html',
            chunks : ['main']
        }),
        new HtmlWebpackPlugin({
            template : './source/complete.html',
            filename : './complete.html',
            chunks : ['complete']
        })
    ]
}