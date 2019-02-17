const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    .enableSingleRuntimeChunk()
    .enableReactPreset()
    .enableSassLoader()
    .addEntry('app', './assets/js/index.js')

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()

    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();
