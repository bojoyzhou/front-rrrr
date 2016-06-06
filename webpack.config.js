var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')

module.exports = {
    debug: process.env.NODE_ENV !== 'production',
    context: path.join(__dirname, './src'),
    entry: {
        jsx: './index.js',
        html: './index.html',
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
                // loaders: [
                //     'style-loader',
                //     'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                //     'postcss-loader'
                // ]
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
    postcss: [
        rucksack({
            autoprefixer: true
        })
    ],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        })
    ],
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
