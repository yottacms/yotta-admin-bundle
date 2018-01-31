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
    
    .createSharedEntry('js/vendor/vendor', [
        'material-ui', 
        'material-ui-icons', 
        'mobx-react',
        'mobx-state-tree',
        'react-router-dom'
    ])


    .addEntry('js/index', './Resources/public/.yottaadmin/js/index')
    .addEntry('js/app', './Resources/public/.yottaadmin/js/components/App')
    
    .addStyleEntry('css/fonts', './Resources/public/.yottaadmin/css/fonts.scss')
    .enableSassLoader()
    
;

module.exports = Encore.getWebpackConfig();
module.exports.externals = [{
        'react': 'React',
        'react-dom': 'ReactDOM',
        // 'material-ui': 'window["material-ui"]',
        'react-addons-transition-group': 'var React.addons.TransitionGroup',
        'react-addons-pure-render-mixin': 'var React.addons.PureRenderMixin',
        'react-addons-create-fragment': 'var React.addons.createFragment',
        'react-addons-update': 'var React.addons.update'
    }
];
