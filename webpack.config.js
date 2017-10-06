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
    .setManifestKeyPrefix('/bundles/yottaadmin/build/')

    .cleanupOutputBeforeBuild()
    
    .createSharedEntry('js/vendor/material-ui.min', ['material-ui'])

    .addEntry('js/index', './Resources/public/src/js/index')
    .addEntry('js/app', './Resources/public/src/js/components/app')
    
    .addStyleEntry('css/fonts', './Resources/public/src/css/fonts.scss')
    .enableSassLoader()
    
;

module.exports = Encore.getWebpackConfig();
module.exports.externals = [{
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
];
