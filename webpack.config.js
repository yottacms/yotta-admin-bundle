// webpack.config.js
const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');

Encore

    .addPlugin(new webpack.optimize.CommonsChunkPlugin({name: 'webpackloader', filename: 'js/webpack-loader.js'}))

    .configureBabel(function(babelConfig) {
        babelConfig.presets.push('stage-2');
        babelConfig.presets.push('react');
        babelConfig.plugins.push('transform-decorators-legacy');
    })

    .setOutputPath('Resources/public/build')
    .setPublicPath('/bundles/yottaadmin/build/')
    .setManifestKeyPrefix('yottaadmin')

    .cleanupOutputBeforeBuild()

    .addEntry('js/index', './Resources/public/.yottaadmin/js/index')
    .addEntry('js/app', './Resources/public/.yottaadmin/js/components/App')

    .addStyleEntry('css/fonts', './Resources/public/.yottaadmin/css/fonts.scss')
    .enableSassLoader()

    .createSharedEntry('js/vendor/vendor', [
        '@material-ui/core',
        'mobx-react',
        'mobx-state-tree',
        'react-router-dom'
    ])

    .addExternals({
        'react': 'React',
        'react-dom': 'ReactDOM',
    })

;

module.exports = Encore.getWebpackConfig();
module.exports.output.jsonpFunction = 'webpackJsonpYotta';
