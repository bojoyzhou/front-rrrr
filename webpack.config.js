var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    })
];
if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
    plugins.push(
        new HtmlWebpackPlugin({
            template: 'edit.html',
            filename: './static/edit.html'
        })
    )
}
module.exports = {
    debug: process.env.NODE_ENV !== 'production',
    context: path.join(__dirname, './src'),
    entry: {
        jsx: './index.js',
        html: './edit.html',
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux'
        ]
    },
    output: {
        path: path.join(__dirname, './static'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.css$/,
            include: /src/,
            loader: 'style!css!autoprefixer'
        }, {
            test: /\.less$/,
            include: /src/,
            loader: 'style!css!autoprefixer!less'
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: [
                'react-hot',
                'babel-loader'
            ]
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }],
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: plugins,
    devServer: {
        contentBase: './src',
        hot: true,
        proxy: {
            '/api/*': {
                target: 'http://www.8zcloud.com'
            },
            '/upload/*': {
                target: 'http://imgs.8zcloud.com'
            },
            '/getfiles*': {
                target: 'http://imgs.8zcloud.com'
            }
            // '/api/collectpager': {
            //     target: 'http://www.8zcloud.com'
            // },
            // '/api/hehheheh': {
            //     target: {
            //         ret: 0,
            //         data: {
            //             hehe: 1
            //         }
            //     }
            //     // target: 'http://www.8zcloud.com'
            // }
        }
    }
}
