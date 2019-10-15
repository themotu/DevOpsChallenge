var path = require('path');

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',

    entry: {
        app: path.join(__dirname, 'web', 'app')
    },

    resolve: {
        extensions: ['.js', '.less'],
        alias: {
            app: path.join(__dirname, 'web', 'app'),
            styles: path.join(__dirname, 'web', 'styles')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/react'],
                            cacheDirectory: true,
                            plugins: [
                                '@babel/plugin-proposal-export-default-from',
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: 'stylesheets/',
                            publicPath: '/assets/stylesheets/'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },

    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',

    output: {
        publicPath: '/assets/',

        path: path.join(__dirname, 'web', 'assets'),

        filename: 'javascripts/[name].js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'web', 'assets'),
        publicPath: '/assets/',
        compress: true,
        port: 8081,
        allowedHosts: ['doc.shipyardapp.com']
    }
};
