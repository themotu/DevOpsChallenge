var path = require('path');

var isProduction = process.env.NODE_ENV === 'production';

console.log('isProduction', isProduction);

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
        //This is a server relative path. That means that the leading slash is
        //important and the resolution of resources will be from the host.
        //
        //This publicPath value is used as if referenced by a browswer.
        //By making it host specific, we know where these files are going to be
        //hosted, and that is why we set this value.
        //We know what this value is equal to whatever path we serve these files
        //from in our backend application.
        publicPath: '/assets/',


        //This is the path to the output directory.
        //Set this value to where we want the built assets to live.
        //
        //Note that the filename option may include directory path separators
        //for the use of defining outputs in different directories.
        path: path.join(__dirname, 'web', 'assets'),

        //This is the file path / name relative to path where the generated file
        //will be placed.
        filename: 'javascripts/[name].js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'web', 'assets'),
        publicPath: '/assets/',
        compress: true,
        port: 8081,
        allowedHosts: ['dev.shipyardapp.com']
    }
};
